import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addPersonalExpense, updatePersonalExpense, removePersonalExpense } from '../store/expensesSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface PersonalExpensesProps {
  person: '1' | '2';
}

const PersonalExpenses: React.FC<PersonalExpensesProps> = ({ person }) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => 
    person === '1' ? state.expenses.person1Expenses : state.expenses.person2Expenses
  );
  const personName = useSelector((state: RootState) => 
    person === '1' ? state.expenses.person1Name : state.expenses.person2Name
  );

  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    installments: '1',
    totalAmount: '',
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editExpense, setEditExpense] = useState({
    name: '',
    amount: '',
    installments: '1',
    totalAmount: '',
  });

  const handleAddExpense = () => {
    if (newExpense.name && newExpense.amount && newExpense.installments) {
      const amount = parseFloat(newExpense.amount);
      const installments = parseInt(newExpense.installments);
      const totalAmount = amount * installments;

      dispatch(addPersonalExpense({
        person,
        expense: {
          id: Date.now().toString(),
          name: newExpense.name,
          amount,
          installments,
          totalAmount,
        },
      }));

      setNewExpense({
        name: '',
        amount: '',
        installments: '1',
        totalAmount: '',
      });
    }
  };

  const handleEdit = (expense: { id: string; name: string; amount: number; installments: number; totalAmount: number }) => {
    setEditingId(expense.id);
    setEditExpense({
      name: expense.name,
      amount: expense.amount.toString(),
      installments: expense.installments.toString(),
      totalAmount: expense.totalAmount.toString(),
    });
  };

  const handleSaveEdit = () => {
    if (editingId && editExpense.name && editExpense.amount && editExpense.installments) {
      const amount = parseFloat(editExpense.amount);
      const installments = parseInt(editExpense.installments);
      const totalAmount = amount * installments;

      dispatch(updatePersonalExpense({
        person,
        id: editingId,
        name: editExpense.name,
        amount,
        installments,
        totalAmount,
      }));

      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    dispatch(removePersonalExpense({ person, id }));
  };

  const calculateTotalAmount = (amount: string, installments: string) => {
    const numAmount = parseFloat(amount) || 0;
    const numInstallments = parseInt(installments) || 1;
    return (numAmount * numInstallments).toFixed(2);
  };

  const totalMonthlyExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalFutureExpenses = expenses.reduce((sum, expense) => sum + expense.totalAmount, 0);

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: { xs: 1, sm: 2, md: 3 } }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
        Gastos Personales - {personName}
      </Typography>

      <Box sx={{ display: 'grid', gap: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Agregar Nuevo Gasto
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' }, gap: 2, alignItems: 'center' }}>
            <TextField
              fullWidth
              label="Nombre del gasto"
              value={newExpense.name}
              onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Monto mensual"
              type="number"
              value={newExpense.amount}
              onChange={(e) => {
                const amount = e.target.value;
                setNewExpense({
                  ...newExpense,
                  amount,
                  totalAmount: calculateTotalAmount(amount, newExpense.installments),
                });
              }}
            />
            <TextField
              fullWidth
              label="Cuotas"
              type="number"
              value={newExpense.installments}
              onChange={(e) => {
                const installments = e.target.value;
                setNewExpense({
                  ...newExpense,
                  installments,
                  totalAmount: calculateTotalAmount(newExpense.amount, installments),
                });
              }}
            />
            <TextField
              fullWidth
              label="Total"
              type="number"
              value={newExpense.totalAmount}
              disabled
            />
            <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddExpense}
                disabled={!newExpense.name || !newExpense.amount || !newExpense.installments}
              >
                Agregar
              </Button>
            </Box>
          </Box>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Monto mensual</TableCell>
                <TableCell align="right">Cuotas</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    {editingId === expense.id ? (
                      <TextField
                        fullWidth
                        value={editExpense.name}
                        onChange={(e) => setEditExpense({ ...editExpense, name: e.target.value })}
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
                        onChange={(e) => {
                          const amount = e.target.value;
                          setEditExpense({
                            ...editExpense,
                            amount,
                            totalAmount: calculateTotalAmount(amount, editExpense.installments),
                          });
                        }}
                      />
                    ) : (
                      `$${expense.amount.toFixed(2)}`
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingId === expense.id ? (
                      <TextField
                        fullWidth
                        type="number"
                        value={editExpense.installments}
                        onChange={(e) => {
                          const installments = e.target.value;
                          setEditExpense({
                            ...editExpense,
                            installments,
                            totalAmount: calculateTotalAmount(editExpense.amount, installments),
                          });
                        }}
                      />
                    ) : (
                      expense.installments
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingId === expense.id ? (
                      <TextField
                        fullWidth
                        type="number"
                        value={editExpense.totalAmount}
                        disabled
                      />
                    ) : (
                      `$${expense.totalAmount.toFixed(2)}`
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingId === expense.id ? (
                      <>
                        <IconButton onClick={handleSaveEdit} color="primary">
                          <SaveIcon />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit} color="error">
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEdit(expense)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(expense.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default PersonalExpenses; 