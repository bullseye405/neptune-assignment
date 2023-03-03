import { formatDecimalNumber } from "@/utils/general";
import { Card, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

enum CURRENCY {
  NEP = "nep",
  BUSD = "busd",
}

const CurrencyConverter = () => {
  const [state, setState] = useState<{
    nep: number | string;
    busd: number | string;
  }>({
    [CURRENCY.NEP]: 1,
    [CURRENCY.BUSD]: 3,
  });

  const handleInputChange = (value: string, input: CURRENCY) => {
    let sanitizedValue = value.replace(/[^\d.]/g, "");

    console.log({ value, sanitizedValue });

    if (!isNaN(Number(sanitizedValue))) {
      if (input === CURRENCY.NEP) {
        setState((prev) => ({
          ...prev,
          [CURRENCY.NEP]: sanitizedValue,
          [CURRENCY.BUSD]: formatDecimalNumber(Number(sanitizedValue) * 3, 2),
        }));
      } else {
        setState((prev) => ({
          ...prev,
          [CURRENCY.NEP]: formatDecimalNumber(Number(sanitizedValue) / 3, 2),
          [CURRENCY.BUSD]: sanitizedValue,
        }));
      }
    }
  };

  return (
    <Card variant="outlined">
      <Box p={3}>
        <Box className="heading">
          <Typography variant="h3">Currency converter</Typography>

          <Box>
            <Typography fontWeight={500}>1 NEP = 3 BUSD</Typography>
          </Box>
        </Box>

        <Box my={2}>
          <TextField
            value={state.nep}
            onChange={(e) => handleInputChange(e.target.value, CURRENCY.NEP)}
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">NEP</InputAdornment>,
            }}
          />
        </Box>
        <Box my={2}>
          <TextField
            value={state.busd}
            onChange={(e) => handleInputChange(e.target.value, CURRENCY.BUSD)}
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">BUSD</InputAdornment>,
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default CurrencyConverter;
