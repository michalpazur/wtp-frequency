import { Divider, Link, styled, Typography } from "@mui/material";
import React from "react";
import { header, link, marginBottom } from "./styles";
import { Question } from "./types";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100vh",
  background: theme.palette.background.paper,
}));

const TextRoot = styled("div")(({ theme }) => ({
  margin: "auto",
  width: "100%",
  maxWidth: 720,
  padding: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    maxWidth: 600,
  },
}));

export const questions: Question[] = [
  {
    question: "Jak czytać mapę?",
    answer:
      "Im grubsza linia, tym więcej pojazdów porusza się danego dnia po tym odcinku drogi. W przypadku torów tramwajowych i dróg dwukierunkowych liczą się kursy w obie strony.",
  },
  {
    question: "Jak często aktualizowane są dane?",
    answer:
      "Aktualnie dane pochodzą zawsze z ostatniego poniedziałku. W przyszłości udostępniony zostanie wgląd w dane archiwalne.",
  },
  {
    question: "Dlaczego trasy w niektórych miejscach wyglądają dziwnie?",
    answer:
      "Trasy linii generowane są automatycznie na podstawie danych rozkładowych ZTM i map OpenStreetMap. Czasem w przypadku remontów, czy tymczasowych objazdów trasy mogą odbiegać od rzeczywistości.",
  },
];

const InfoPage: React.FC = () => {
  return (
    <Root>
      <TextRoot>
        <Typography variant="h1" sx={header}>
          Mapa częstotliwości kursowania Warszawskiego Transportu Publicznego
        </Typography>
        <Divider sx={marginBottom} />
        {questions.map((q) => (
          <React.Fragment key={q.question}>
            <Typography variant="h2" sx={marginBottom}>
              {q.question}
            </Typography>
            <Typography sx={marginBottom}>{q.answer}</Typography>
          </React.Fragment>
        ))}
        <Divider sx={marginBottom} />
        <Typography>
          Dane rozkładowe: <Link href="https://ztm.waw.pl">ZTM Warszawa</Link>
        </Typography>
        <Typography>
          Dane parsowane dzięki:{" "}
          <Link href="https://github.com/MKuranowski/WarsawGTFS">
            MKuranowski/WarsawGTFS
          </Link>
        </Typography>
        <Link sx={link} href="https://twitter.com/michalpazur">
          Twitter
        </Link>
        <Link sx={link} href="https://github.com/michalpazur/wtp-frequency">
          GitHub
        </Link>
      </TextRoot>
    </Root>
  );
};

export default InfoPage;
