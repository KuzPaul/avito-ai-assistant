import { useState, useCallback } from "react";
import { generateDescription, generatePrice } from "../api/llm";
import type { AdFormData } from "../types";
export const useLLM = () => {
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isGeneratingPrice, setIsGeneratingPrice] = useState(false);

  const generateDescriptionForAd = useCallback(
    async (AdFormData: AdFormData): Promise<string | null> => {
      setIsGeneratingDescription(true);
      try {
        const description = await generateDescription({
          title: AdFormData.title,
          category: AdFormData.category,
          price: AdFormData.price,
          params: AdFormData.params,
        });
        return description;
      } catch (err) {
        alert("Ошибка генерации описания");
        return null;
      } finally {
        setIsGeneratingDescription(false);
      }
    },
    [],
  );

  const generatePriceForAd = useCallback(
    async (AdFormData: AdFormData): Promise<number | null> => {
      setIsGeneratingPrice(true);
      try {
        const price = await generatePrice({
          title: AdFormData.title,
          category: AdFormData.category,
          params: AdFormData.params,
        });
        return price;
      } catch (err) {
        alert("Ошибка генерации цены");
        return null;
      } finally {
        setIsGeneratingPrice(false);
      }
    },
    [],
  );

  return {
    generateDescriptionForAd,
    generatePriceForAd,
    isGeneratingDescription,
    isGeneratingPrice,
  };
};
