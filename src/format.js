export const parseTradeInfo = (text) => {
  // Extract Buy/Sell
  const typeMatch = text.match(/(buy|sell)/i);
  const tradeType = typeMatch ? typeMatch[1].toLowerCase() : "";

  // Extract trading pair (e.g. EURUSD, GBPUSD)
  const pairMatch = text.match(/\b[A-Z]{6}\b/);
  const pair = pairMatch ? pairMatch[0] : "";

  // Extract trade date
  const dateMatch = text.match(/\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}:\d{2}/);
  const tradeDate = dateMatch ? dateMatch[0] : "";

  // Extract Stop Loss
  const slMatch = text.match(/S\/L:\s*([\d.]+)/i);
  const stopLoss = slMatch ? parseFloat(slMatch[1]) : null;

  // Extract Take Profit
  const tpMatch = text.match(/T\/P:\s*([\d.]+)/i);
  const takeProfit = tpMatch ? parseFloat(tpMatch[1]) : null;

  return {
    pair,
    tradeType,
    tradeDate,
    stopLoss,
    takeProfit,
  };
};
