import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Grid,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  addCommonExpense,
  updateCommonExpense,
  removeCommonExpense,
} from '../store/expensesSlice';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const CommonExpenses: React.FC = () => {
  const dispatch = useDispatch();
  const commonExpenses = useSelector((state: RootState) => state.expenses.commonExpenses);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editExpense, setEditExpense] = useState({ name: '', amount: '' });

  const handleAddExpense = () => {
    if (newExpense.name && newExpense.amount) {
      dispatch(
        addCommonExpense({
          id: Date.now().toString(),
          name: newExpense.name,
          amount: parseFloat(newExpense.amount),
        })
      );
      setNewExpense({ name: '', amount: '' });
    }
  };

  const handleEdit = (expense: { id: string; name: string; amount: number }) => {
    setEditingId(expense.id);
    setEditExpense({
      name: expense.name,
      amount: expense.amount.toString(),
    });
  };

  const handleSaveEdit = () => {
    if (editingId && editExpense.name && editExpense.amount) {
      dispatch(
        updateCommonExpense({
          id: editingId,
          name: editExpense.name,
          amount: parseFloat(editExpense.amount),
        })
      );
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    dispatch(removeCommonExpense(id));
  };

  const totalExpenses = commonExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: { xs: 1, sm: 2, md: 3 } }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Gastos Comunes
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Formulario de agregar gasto */}
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <AccountBalanceIcon color="primary" />
            <Typography variant="h6">Agregar Nuevo Gasto</Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr auto' }, gap: 2, alignItems: 'center' }}>
            <TextField
              fullWidth
              label="Nombre del gasto"
              value={newExpense.name}
              onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Monto"
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <Button
              variant="contained"
              onClick={handleAddExpense}
              disabled={!newExpense.name || !newExpense.amount}
              sx={{ height: '56px' }}
            >
              Agregar
            </Button>
          </Box>
        </Paper>

        {/* Lista de gastos */}
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <AccountBalanceIcon color="primary" />
            <Typography variant="h6">Gastos Registrados</Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Monto</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commonExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      {editingId === expense.id ? (
                        <TextField
                          fullWidth
                          value={editExpense.name}
                          onChange={(e) => setEditExpense({ ...editExpense, name: e.target.value })}
                          size="small"
                        />
                      ) : (
                        expense.name
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {editingId === expense.id ? (
                        <TextField
                          fullWidth
                          type="number"
                          value={editExpense.amount}
                          onChange={(e) => setEditExpense({ ...editExpense, amount: e.target.value })}
                          size="small"
                        />
                      ) : (
                        `$${expense.amount.toFixed(2)}`
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {editingId === expense.id ? (
                        <>
                          <IconButton onClick={handleSaveEdit} color="primary" size="small">
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={handleCancelEdit} color="error" size="small">
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => handleEdit(expense)} color="primary" size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(expense.id)} color="error" size="small">
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Total
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      ${totalExpenses.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default CommonExpenses; 