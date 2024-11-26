import { styled as MuiStyled  } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

export const TableCellData = MuiStyled(TableCell)(({ theme }) => ({
    fontSize: '11px',
    padding: '10px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      padding: '8px',
    },
  }));