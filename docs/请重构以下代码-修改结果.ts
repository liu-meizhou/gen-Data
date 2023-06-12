// 请使用优化以下代码：

// 假设已经存在以下3个函数，3个函数的功能都是向服务器上传文件，根据不同的上传类型参数都会不一样。内容的实现这里无须关注
// 请重新设计一个功能，根据不同文件的后缀名，上传到不同的服务器。
// txt 上传到 ftp
// exe 上传到 sftp
// doc 上传到 http
function uploadByFtp (file: string): Promise<boolean> {
    return new Promise(resolve => resolve(true))
}
function uploadBySftp (file: string[], cb: (ret: boolean) => void): void {
    cb(true)
}
function uploadByHttp (file: string): boolean {
    return true
}

// 实现---------------------------------------------------------------------------------------------------------

interface FileMsg {
    ext: string;   // 文件扩展名称
    file: string;  // 文件路径
}

/**
 * 公共函数: 处理文件: 解析文件信息
 * @param file 文件 
 * @returns 文件信息object {type: '文件后缀', file: string}
 */
function handleFile (file: string): FileMsg {
    const ext = file.match(/\.(\w+)$/)?.[1];
    return {
        ext,
        file
    }
}

/**
 * 公共函数: info
 * @param msg  
 * @returns
 */
function info (msg: string) {
    console.log(msg)
}

/**
 * 公共函数: error
 * @param msg  
 * @returns
 */
function error (msg: string) {
    console.error(msg)
}

const log = {
    info,
    error
}

function uploadByFtpPromise (file: FileMsg): Promise<boolean> {
    return uploadByFtp(file.file);
}
function uploadBySftpPromise (file: FileMsg): Promise<boolean> {
    return new Promise((resolve, reject) => {
        uploadBySftp([file.file], ret => {
            if (ret) {
                resolve(true)
            } else {
                reject()
            }
        })
    });
}
function uploadByHttpPromise (file: FileMsg): Promise<boolean> {
    return Promise.resolve(uploadByHttp(file.file))
}

interface FileHandleConfig {
    isUploadFile: RegExp | ((file: FileMsg) => boolean);  // RegExp都是匹配后缀名，function可支持自定义
    handle: (file: FileMsg) => Promise<boolean>; // 处理
}

const globalFileHandleConfig: Array<FileHandleConfig> = [
    {
        isUploadFile: /\.txt$/,
        handle: uploadByFtpPromise
    }, {
        isUploadFile:  /\.exe$/,
        handle: uploadBySftpPromise
    }, {
        isUploadFile:  /\.doc$/,
        handle: uploadByHttpPromise
    }
];

function uploadFile (file: FileMsg, fileHandleConfig = globalFileHandleConfig): Promise<boolean> {
    const fileHandle = fileHandleConfig.find(item => {
        if (typeof item.isUploadFile === 'function') {
            return item.isUploadFile(file);
        }
        return item.isUploadFile.test(file.ext);
    })
    if (!fileHandle?.handle) {
        return Promise.reject(false);
    }
    return fileHandle.handle(file);
}

// 实现如下
function uploadFiles (files: string[], fileHandleConfig = globalFileHandleConfig): Promise<boolean[]> {
    return Promise.all(files.map((file) => {
        const fileMsg = handleFile(file);
        return uploadFile(fileMsg, fileHandleConfig);
    })).then((res) => {
        log.info('upload success.')
        return res
    }).catch((error) => {
        log.error('upload error')
        return error
    })
}
