import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  styled,
  MenuItem,
} from "@mui/material";
import { Assignment } from "@mui/icons-material";
import { Config } from "@/config";
import Head from "next/head";
import { BaseGrid } from "@/components/Elements/BaseGrid";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export default function Home(): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState<boolean>(true);
  const [passwordStrength, setPasswordStrength] = useState<string>("Weak");

  const handlePasswordLengthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPasswordLength(parseInt(event.target.value));
  };

  const handleIncludeUppercaseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIncludeUppercase(event.target.checked);
  };

  const handleIncludeLowercaseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIncludeLowercase(event.target.checked);
  };

  const handleIncludeNumbersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIncludeNumbers(event.target.checked);
  };

  const handleIncludeSpecialCharsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIncludeSpecialChars(event.target.checked);
  };

  const generatePassword = (): void => {
    let characterSets: string[] = [];
    if (includeUppercase) {
      characterSets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }
    if (includeLowercase) {
      characterSets.push("abcdefghijklmnopqrstuvwxyz");
    }
    if (includeNumbers) {
      characterSets.push("0123456789");
    }
    if (includeSpecialChars) {
      characterSets.push("!@#$%^&*");
    }

    if (characterSets.length === 0) {
      setPassword("NO CHARACTERS SELECTED");
      return;
    }

    let passwordChars = "";
    for (let i = 0; i < passwordLength; i++) {
      let setIndex = Math.floor(Math.random() * characterSets.length);
      let charIndex = Math.floor(
        Math.random() * characterSets[setIndex].length
      );
      passwordChars += characterSets[setIndex][charIndex];
    }
    setPassword(passwordChars);
    let uniqueChars = new Set(passwordChars);
    let passwordStrength = "Weak";
    if (uniqueChars.size >= 8 && uniqueChars.size <= 15) {
      passwordStrength = "Strong";
    } else if (uniqueChars.size >= 16) {
      passwordStrength = "Very Strong";
    }

    setPasswordStrength(passwordStrength);
  };

  return (
    <>
      <Head>
        <title>{Config.title}</title>
        <meta name="description" content="Generate a random password" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseGrid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {Config.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              id="password-length"
              label="Password Length"
              type="number"
              value={passwordLength}
              onChange={handlePasswordLengthChange}
              inputProps={{
                min: 8,
                max: 32,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Character Sets
            </Typography>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={handleIncludeUppercaseChange}
                />{" "}
                Uppercase Letters
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={handleIncludeLowercaseChange}
                />{" "}
                Lowercase Letters
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={handleIncludeNumbersChange}
                />{" "}
                Numbers
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={includeSpecialChars}
                  onChange={handleIncludeSpecialCharsChange}
                />
                Special Characters
              </label>
            </div>
          </Grid>
          <Grid item xs={12}>
            <StyledButton
              variant="contained"
              color="primary"
              startIcon={<Assignment />}
              onClick={generatePassword}
            >
              Generate Password
            </StyledButton>
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              id="generated-password"
              label="Generated Password"
              value={password}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <Typography variant="subtitle2" gutterBottom>
              Password Strength: [{passwordStrength}]
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigator.clipboard.writeText(password)}
            >
              Copy to Clipboard
            </Button>
          </Grid>
        </Grid>
      </BaseGrid>
    </>
  );
}
