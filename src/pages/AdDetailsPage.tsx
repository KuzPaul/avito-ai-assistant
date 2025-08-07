import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Alert,
  AlertTitle,
  AppBar,
  Toolbar,
} from "@mui/material";
import EditIcon from "../assets/editIcon.svg?react";
import { useQuery } from "@tanstack/react-query";
import { getItemById } from "../api/items";
import { Loading } from "../components/UI/Loading";
import { ErrorAlert } from "../components/UI/ErrorAlert";
import { formatDate } from "../utils/convertData";
import { getMissingFields } from "../utils/getMissingFields";
import { PARAM_LABELS } from "../utils/getMissingFields";
import { Container } from "../components/Layout/Container";

export const AdDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <ErrorAlert
        message={error?.message}
        onRetry={() => window.location.reload()}
      />
    );

  if (!item) return <ErrorAlert message="Объявление не найдено" />;

  // Незаполненные поля
  const missingFields = getMissingFields(item);

  const filledParams = item.params
    ? Object.entries(item.params).filter(([_key, value]) => value)
    : [];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: "40px" }}>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ mb: "64px", overflow: "hidden" }}
      >
        <Toolbar
          sx={{
            flexDirection: "column",
            alignItems: "stretch",
            pt: 4,
            "&.MuiToolbar-root": {
              paddingLeft: "32px",
              paddingRight: "32px",
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              fontWeight={500}
              sx={{
                fontSize: "30px",
                lineHeight: "40px",
                mb: 2,
              }}
            >
              {item.title}
            </Typography>
            <Typography
              sx={{ fontSize: "30px", lineHeight: "40px" }}
              fontWeight={500}
            >
              {item.price.toLocaleString()} ₽
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              endIcon={<EditIcon />}
              onClick={() => navigate(`/ads/${id}/edit`)}
              sx={{
                color: "#F3F3F3",
                display: "flex",
                gap: 1,
                alignItems: "center",
                bgcolor: "#1890FF",
                p: "8px 12px",
                fontSize: "14px",
                lineHeight: 1.4,
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              Редактировать
            </Button>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  color: "rgba(132, 131, 136, 1)",
                  fontSize: "16px",
                  lineHeight: 1,
                  mb: 0.5,
                }}
              >
                Опубликовано: {formatDate(item.createdAt)}
              </Typography>
              {item.updatedAt && (
                <Typography
                  sx={{
                    color: "rgba(132, 131, 136, 1)",
                    fontSize: "16px",
                    lineHeight: 1,
                  }}
                >
                  Отредактировано: {formatDate(item.updatedAt)}
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ borderBottom: "1px solid #F0F0F0", pt: 4, m: 0 }}></Box>
        </Toolbar>
      </AppBar>

      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Фото  */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#a8a8a8",
              minHeight: "360px",
              maxWidth: "480px",
              borderRadius: "8px",
            }}
          >
            <img
              src={item.imageUrl || undefined}
              alt={item.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: 400,
                objectFit: "contain",
                borderRadius: 12,
              }}
            />
          </Box>

          {/* Правый блок */}
          <Box sx={{ flex: 1 }}>
            {/* незаполненные поля */}

            {missingFields.length > 0 ? (
              <Box
                sx={{
                  position: "relative",
                  mb: "36px",
                  p: "12px 50px",
                  maxWidth: "512px",
                  bgcolor: "#F9F1E6",
                  borderRadius: 2,
                  boxShadow:
                    "0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)",

                  "&::before": {
                    content: '"!"',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    color: "#ffffff",
                    width: "18px",
                    height: "18px",
                    bgcolor: "#FFA940",
                    left: "16px",
                    top: "16px",
                    borderRadius: "50%",
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ mb: "4px" }}
                >
                  Требуются доработки
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: "22px" }}>
                  У объявления не заполнены поля:
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 3 }}>
                  {missingFields.map((field) => (
                    <Typography component="li" key={field} variant="body2">
                      {field}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ) : (
              <Alert severity="success" sx={{ mb: 3 }}>
                <AlertTitle>Всё заполнено</AlertTitle>
                <Typography sx={{ fontWeight: "500" }}>
                  Объявление полностью заполнено.
                </Typography>
              </Alert>
            )}

            {/* Характеристики */}
            <Typography
              fontWeight="500"
              sx={{ mb: 2, fontSize: "22px", lineHeight: "28px" }}
            >
              Характеристики
            </Typography>
            {filledParams.length > 0 && (
              <>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
                >
                  {filledParams.map(([key, value]) => {
                    const label = PARAM_LABELS[key] || key;
                    return (
                      <Box
                        key={key}
                        sx={{
                          display: "flex",
                          gap: "6px",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ width: "148px" }}
                        >
                          {label}:
                        </Typography>
                        <Typography variant="body2">{String(value)}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              </>
            )}
          </Box>
        </Box>

        {/* Описание */}
        <Typography
          fontWeight="500"
          sx={{ mb: 2, fontSize: "22px", lineHeight: "28px" }}
        >
          Описание
        </Typography>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            fontSize: "16px",
            lineHeight: 1.4,
            maxWidth: "480px",
          }}
        >
          {item.description?.trim() ? item.description : "Описание отсутствует"}
        </Typography>
      </Container>
    </Box>
  );
};
