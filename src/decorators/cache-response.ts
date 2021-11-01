export function CacheResponse<T>(useFirstParameterAsKey = false) {
  return function (_: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalFn = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheKey = useFirstParameterAsKey ? args[0] : propertyKey;
      const json = localStorage.getItem(cacheKey)!;
      const cachedData: T = JSON.parse(json) || null;

      if (cachedData) return cachedData;

      const data = await originalFn.apply(this, args);
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    };
  };
}
