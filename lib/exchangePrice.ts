import axios from "axios";

export const exchangePrice = async (
  value: number,
  targetCurrency: string,
  baseCurrency: string = "USD"
) => {
  if (!targetCurrency || !baseCurrency || targetCurrency === baseCurrency)
    return value;

  try {
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY}&base_currency=${baseCurrency}`
    );

    const exchangeRates = response.data?.data;
    const targetRate = exchangeRates?.[targetCurrency];

    if (!targetRate) {
      console.warn("Currency rate not found. Returning original value.");
      return value;
    }

    const exchangedPrice = +(value * targetRate).toFixed(2);
    return exchangedPrice;
  } catch (error: any) {
    console.error("Exchange rate fetch failed:", error?.message || error);
    return value;
  }
};
