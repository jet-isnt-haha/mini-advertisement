export const NavigateByUrl = (url: string) => {
  // 确保带协议
  const ensureProtocol = (url?: string) => {
    if (!url) return url;
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url)) return url; // 已有协议
    return `https://${url}`; // 默认加 https
  };
  const targetUrl = ensureProtocol(url);

  if (targetUrl) {
    const newWin = window.open(targetUrl, "_blank");
    if (newWin) newWin.opener = null;
  } else {
    // 可加提示或 fallback
    console.warn("无效的跳转地址:", url);
  }
};
