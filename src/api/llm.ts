interface GenerateDescriptionParams {
  title: string;
  category: string;
  price: number;
  params: Record<string, any>;
}

interface GeneratePriceParams {
  title: string;
  category: string;
  params: Record<string, any>;
}

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "llama3.2:3b";

//генерация описания
export async function generateDescription({
  title,
  category,
  price,
  params,
}: GenerateDescriptionParams): Promise<string> {
  const prompt = `Ты — русскоязычный ассистент не добавляй английские слова в описание. Отвечай только на русском языке. Напиши привлекательное описание для объявления: ${title}. Категория: ${category}. Цена: ${price} руб. Характеристики: ${JSON.stringify(params)}`;

  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response;
}

//генерация цены
export async function generatePrice({
  title,
  category,
  params,
}: GeneratePriceParams): Promise<number> {
  const prompt = `Определи рыночную цену в рублях для товара.

Название: ${title}
Категория: ${category}
Характеристики: ${JSON.stringify(params)}

Верни ТОЛЬКО число (например: 15000). Никаких слов, только цифры.`;

  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false,
      options: {
        num_predict: 100,
        temperature: 0.3,
      },
    }),
  });

  const data = await response.json();
  const priceMatch = data.response.match(/\d+/);

  if (priceMatch) {
    const price = parseInt(priceMatch[0]);
    if (price > 0) return price;
  }

  throw new Error("Не удалось определить цену");
}
