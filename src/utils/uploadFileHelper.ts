//文件上传辅助函数(批量上传文件)
const fileCache: File[] = [];
const MAX_CACHE_SIZE = 3; // 设置缓存的最大文件数量
const MAX_CACHE_TIME = 3000; // 设置缓存的最大时间（毫秒）

let uploadTimer: ReturnType<typeof setTimeout> | null = null;

const executeBatchUpload = async <T>(
  uploadFunction: (files: File[]) => Promise<T>
): Promise<T | null> => {
  if (fileCache.length === 0) return null;
  const filesToUpload = [...fileCache];
  fileCache.length = 0;
  if (uploadTimer) {
    clearTimeout(uploadTimer);
    uploadTimer = null;
  }

  return await uploadFunction(filesToUpload);
};

export const uploadFileHelper = async <T>(
  file: File,
  uploadFunction: (files: File[]) => Promise<T>
): Promise<T | null> => {
  fileCache.push(file);
  if (fileCache.length > MAX_CACHE_SIZE) {
    return await executeBatchUpload(uploadFunction);
  }

  if (uploadTimer) {
    clearTimeout(uploadTimer);
  }

  return new Promise((resovle) => {
    uploadTimer = setTimeout(async () => {
      const result = await executeBatchUpload(uploadFunction);
      resovle(result);
    }, MAX_CACHE_TIME);
  });
};

//手动触发
export const flushUpload = async <T>(
  uploadFunction: (file: File[]) => Promise<T>
) => {
  return await executeBatchUpload(uploadFunction);
};
