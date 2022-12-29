import { GitHub, Twitter } from "@mui/icons-material";
import { Divider, Link, styled, Typography } from "@mui/material";
import React from "react";
import WTPIcon from "./components/WTPIcon";
import { header, link, linkIcon, marginBottom } from "./styles";
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
            <Typography variant="h2" mb={1}>
              {q.question}
            </Typography>
            <Typography sx={marginBottom}>{q.answer}</Typography>
          </React.Fragment>
        ))}
        <Divider sx={marginBottom} />
        <Typography>
          Dane rozkładowe:{" "}
          <Link href="https://ztm.waw.pl">
            <WTPIcon sx={linkIcon} /> ZTM Warszawa
          </Link>
        </Typography>
        <Typography>
          Dane parsowane dzięki:{" "}
          <Link href="https://github.com/MKuranowski/WarsawGTFS">
            <GitHub sx={linkIcon} /> MKuranowski/WarsawGTFS
          </Link>
        </Typography>
        <Link sx={link} href="https://twitter.com/michalpazur">
          <Twitter sx={linkIcon} /> Twitter
        </Link>
        <Link sx={link} href="https://github.com/michalpazur/wtp-frequency">
          <GitHub sx={linkIcon} /> GitHub
        </Link>
      </TextRoot>
    </Root>
  );
};

export default InfoPage;
