/**
 * LocalStorage 封装工具
 */

interface StorageOptions {
  expire?: number; // 过期时间（毫秒）
}

interface StorageData<T> {
  value: T;
  expire?: number;
}

class Storage {
  /**
   * 设置存储
   * @param key 键名
   * @param value 值
   * @param options 选项（过期时间等）
   */
  static setItem<T>(key: string, value: T, options?: StorageOptions): void {
    try {
      const data: StorageData<T> = {
        value,
        expire: options?.expire ? Date.now() + options.expire : undefined,
      };
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`LocalStorage setItem 失败: ${key}`, error);
    }
  }

  /**
   * 获取存储
   * @param key 键名
   * @returns 存储的值，如果过期或不存在返回 null
   */
  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const data: StorageData<T> = JSON.parse(item);

      // 检查是否过期
      if (data.expire && Date.now() > data.expire) {
        this.removeItem(key);
        return null;
      }

      return data.value;
    } catch (error) {
      console.error(`LocalStorage getItem 失败: ${key}`, error);
      return null;
    }
  }

  /**
   * 删除存储
   * @param key 键名
   */
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`LocalStorage removeItem 失败: ${key}`, error);
    }
  }

  /**
   * 清空所有存储
   */
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("LocalStorage clear 失败", error);
    }
  }

  /**
   * 检查键是否存在
   * @param key 键名
   */
  static hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /**
   * 获取所有键
   */
  static keys(): string[] {
    return Object.keys(localStorage);
  }
}

export default Storage;