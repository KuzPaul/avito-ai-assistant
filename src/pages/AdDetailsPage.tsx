import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getItemById } from "../api/items";
import { Loading } from "../components/UI/Loading";
import { ErrorAlert } from "../components/UI/ErrorAlert";
import { getMissingFields } from "../utils/getMissingFields";
import { Container } from "../components/Layout/Container";
import { AdDetailsHeader } from "../components/Ads/AdDetailsHeader";
import { RevisionAlert } from "../components/Ads/RevisionAlert";
import { AdParamsList } from "../components/Ads/AdParamsList";
import styles from "./AdDetailsPage.module.css";

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

  const missingFields = getMissingFields(item);

  return (
    <Box className={styles.page}>
      <AdDetailsHeader
        item={item}
        onBack={() => navigate("/ads")}
        onEdit={() => navigate(`/ads/${id}/edit`)}
      />

      <Container>
        <Box className={styles.contentRow}>
          <Box className={styles.imageBox}>
            <img
              src={item.imageUrl || undefined}
              alt={item.title}
              loading="lazy"
              className={styles.image}
            />
          </Box>

          <Box className={styles.details}>
            <RevisionAlert missingFields={missingFields} />
            <AdParamsList params={item.params ?? {}} />
          </Box>
        </Box>

        <Typography className={styles.sectionTitle}>Описание</Typography>
        <Typography variant="body1" className={styles.description}>
          {item.description?.trim() ? item.description : "Описание отсутствует"}
        </Typography>
      </Container>
    </Box>
  );
};
