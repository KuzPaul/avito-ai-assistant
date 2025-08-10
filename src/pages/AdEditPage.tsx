import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "../components/Layout/Container";
import IconGenerate from "../assets/iconGenerate.svg?react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";

import { useQuery, useMutation } from "@tanstack/react-query";
import { getItemById, updateItem } from "../api/items";
import { Loading } from "../components/UI/Loading";
import { ErrorAlert } from "../components/UI/ErrorAlert";
import { queryClient } from "../utils/queryClient";
import { useLLM } from "../hooks/useLLM";
import { adSchema, type AdFormValues } from "../types/adSchema";
import { FormField } from "../components/UI/FormField";
import type { AdFormData, Category, ItemParams } from "../types";
import { ClearButton } from "../components/UI/ClearButton";
import {
  CustomSnackbar,
  type SnackbarState,
} from "../components/UI/CustomSnackbar";
import { CATEGORY_FIELDS } from "../constants/Category";
import { AiResult } from "../components/UI/AiResult";
import { prepareAdData } from "../utils/prepareAdData";

const getDraftKey = (id: string) => `ad-draft-${id}`;

export const AdEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    type: "success",
  });
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [aiPrice, setPrice] = useState<number | null>(null);

  const {
    generateDescriptionForAd,
    generatePriceForAd,
    isGeneratingDescription,
    isGeneratingPrice,
  } = useLLM();

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AdFormValues>({
    resolver: zodResolver(adSchema),
    mode: "onChange",
    defaultValues: {
      category: "",
      title: "",
      price: 0,
      description: "",
      params: {},
    },
  });

  const watchedCategory = watch("category");
  const watchedTitle = watch("title");
  const watchedPrice = watch("price");
  const watchedDescription = watch("description");
  const isFormValid = !!watchedTitle && watchedPrice > 0 && !!watchedCategory;

  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (item) {
      const draft = localStorage.getItem(getDraftKey(id!));
      if (draft) {
        const parsed = JSON.parse(draft);
        if (window.confirm("Найден несохранённый черновик. Восстановить?"))
          reset(parsed);
        else {
          reset({
            category: item.category,
            title: item.title,
            price: item.price,
            description: item.description || "",
            params: item.params || {},
          });
          localStorage.removeItem(getDraftKey(id!));
        }
      } else
        reset({
          category: item.category,
          title: item.title,
          price: item.price,
          description: item.description || "",
          params: item.params || {},
        });
    }
  }, [item, id, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (id && value)
        localStorage.setItem(getDraftKey(id!), JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch, id]);

  const mutation = useMutation({
    mutationFn: (data: AdFormData) => {
      const payload = prepareAdData(data);
      console.log("Отправляем:", payload);
      return updateItem(id!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["item", id] });
      localStorage.removeItem(getDraftKey(id!));
      setSnackbar({
        open: true,
        title: "Изменения сохранены",
        type: "success",
      });
      setTimeout(() => navigate(`/ads/${id}`), 1500);
    },
    onError: () =>
      setSnackbar({
        open: true,
        title: "Ошибка сохранения",
        description:
          "При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.",
        type: "error",
      }),
  });

  const handleGenerateDescription = useCallback(async () => {
    const formData = watch() as AdFormData;
    const description = await generateDescriptionForAd(formData);

    if (description) {
      setAiDescription(description);
    }
  }, [watch, generateDescriptionForAd]);

  const handleGeneratePrice = useCallback(async () => {
    const formData = watch() as AdFormData;

    const price = await generatePriceForAd(formData);
    if (price) {
      setPrice(price);
    }
  }, [watch, generatePriceForAd]);

  const onSubmit = (data: AdFormValues) => {
    const payload: AdFormData = {
      ...data,
      category: data.category as Category,
      params: data.params as ItemParams,
      description: data.description || "",
    };

    mutation.mutate(payload);
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <ErrorAlert
        message={error?.message}
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <Container py={"32px"}>
      <Typography
        variant="h1"
        fontWeight="500"
        sx={{
          fontSize: "30px",
          lineHeight: "40px",
          mb: "18px",
        }}
      >
        Редактирование объявления
      </Typography>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Категория */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            mb: "18px",
          }}
        >
          <FormField
            label="Категория"
            required
            select
            options={["electronics", "auto", "real_estate"]}
            value={watchedCategory}
            onChange={(e) => setValue("category", e.target.value)}
            error={!!errors.category}
            helperText={errors.category?.message}
            showWarning={!watchedCategory}
            width="256px"
          />
          {<Divider sx={{ width: "100%" }} />}

          {/* Название */}
          <FormField
            label="Название"
            required
            value={watchedTitle}
            onChange={(e) => setValue("title", e.target.value)}
            error={!!errors.title}
            helperText={errors.title?.message}
            showWarning={!watchedTitle}
            slotProps={{
              input: {
                endAdornment: watchedTitle && (
                  <ClearButton onClick={() => setValue("title", "")} />
                ),
              },
            }}
          />
          {<Divider sx={{ width: "100%" }} />}

          {/* Цена с кнопкой справа */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "flex-end",
              position: "relative",
            }}
          >
            <FormField
              label="Цена"
              required
              type="number"
              value={watchedPrice}
              onChange={(e) => setValue("price", Number(e.target.value))}
              error={!!errors.price}
              helperText={errors.price?.message}
              showWarning={!watchedPrice}
              slotProps={{
                input: {
                  endAdornment: watchedPrice ? (
                    <ClearButton onClick={() => setValue("price", 0)} />
                  ) : undefined,
                },
              }}
            />
            <Button
              onClick={handleGeneratePrice}
              startIcon={<IconGenerate />}
              disabled={isGeneratingPrice}
              sx={{
                borderRadius: "8px",
                border: "none",
                bgcolor: "#F9F1E6",
                fontWeight: "400",
                py: "5px",
                fontSize: "14px",
                lineHeight: "22px",
                textTransform: "none",
                color: "#FFA940",
                px: "10px",
              }}
            >
              {isGeneratingPrice ? (
                <CircularProgress size={24} />
              ) : (
                "Узнать рыночную цену"
              )}
            </Button>
            <AiResult
              value={aiPrice}
              onApply={() => {
                setValue("price", aiPrice ?? NaN);
                setPrice(null);
              }}
              onClose={() => setPrice(null)}
            />
          </Box>
          {<Divider sx={{ width: "100%" }} />}
        </Box>

        {/* Характеристики */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            mb: "18px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: 1.4,
              mb: 1,
            }}
          >
            Характеристики
          </Typography>
          {watchedCategory &&
            CATEGORY_FIELDS[watchedCategory]?.map((field) => (
              <FormField
                key={field.name}
                label={field.label}
                select={field.type === "select"}
                options={field.options}
                value={watch(`params.${field.name}`) ?? ""}
                onChange={(e) => {
                  const val = e.target.value;

                  if (field.type === "number") {
                    setValue(
                      `params.${field.name}`,
                      val === "" ? undefined : Number(val),
                    );
                  } else {
                    setValue(`params.${field.name}`, val);
                  }
                }}
                showWarning={!watch(`params.${field.name}`)}
                slotProps={{
                  input: {
                    endAdornment: watch(`params.${field.name}`) ? (
                      <ClearButton
                        onClick={() => setValue(`params.${field.name}`, "")}
                      />
                    ) : undefined,
                  },
                }}
              />
            ))}
        </Box>
        {<Divider sx={{ width: "100%", mb: "18px" }} />}

        {/* Описание */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: "34px",
            position: "relative",
          }}
        >
          <FormField
            label="Описание"
            multiline
            rows={6}
            value={watchedDescription}
            onChange={(e) => setValue("description", e.target.value)}
            showWarning={!watchedDescription}
            helperText={`${watchedDescription?.length || 0}/1000`}
            slotProps={{
              input: {
                endAdornment: watchedDescription ? (
                  <ClearButton onClick={() => setValue("description", "")} />
                ) : undefined,
              },
            }}
          />
          <Button
            startIcon={<IconGenerate />}
            onClick={handleGenerateDescription}
            disabled={isGeneratingDescription}
            sx={{
              borderRadius: "8px",
              border: "none",
              bgcolor: "#F9F1E6",
              fontWeight: "400",
              py: "5px",
              fontSize: "14px",
              lineHeight: "22px",
              textTransform: "none",
              color: "#FFA940",
              px: "10px",
            }}
          >
            {isGeneratingDescription ? (
              <CircularProgress size={20} />
            ) : watchedDescription ? (
              "Улучшить описание"
            ) : (
              "Придумать описание"
            )}
          </Button>
          <AiResult
            value={aiDescription}
            onApply={() => {
              setValue("description", aiDescription ?? "");
              setAiDescription(null);
            }}
            onClose={() => setAiDescription(null)}
          />
        </Box>

        {/* Кнопки действий */}
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid || mutation.isPending}
            sx={{
              bgcolor: isFormValid ? "#1890FF" : "#D9D9D9",
              color: isFormValid ? "#FFFFFF" : "rgba(243, 243, 243, 1)",
              "&:hover": { bgcolor: isFormValid ? "#1890FF" : "#D9D9D9" },
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 400,
              padding: "8px 12px",
              borderRadius: "8px",
            }}
          >
            {mutation.isPending ? <CircularProgress size={24} /> : "Сохранить"}
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate(`/ads/${id}`)}
            sx={{
              bgcolor: "#D9D9D9",
              color: "rgba(90, 90, 90, 1)",
              "&:hover": { bgcolor: "#D9D9D9" },
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 400,
              padding: "8px 12px",
              borderRadius: "8px",
            }}
          >
            Отменить
          </Button>
        </Box>
      </form>
      <CustomSnackbar
        open={snackbar.open}
        title={snackbar.title}
        type={snackbar?.type}
        description={snackbar?.description}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </Container>
  );
};
