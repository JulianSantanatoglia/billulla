import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setPerson1Salary, setPerson2Salary, setPerson1Name, setPerson2Name } from '../store/expensesSlice';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const {
    commonExpenses,
    person1Expenses,
    person2Expenses,
    person1Salary,
    person2Salary,
    person1Name,
    person2Name,
  } = useSelector((state: RootState) => state.expenses);

  const [editingPerson1, setEditingPerson1] = useState(false);
  const [editingPerson2, setEditingPerson2] = useState(false);
  const [editingName1, setEditingName1] = useState(false);
  const [editingName2, setEditingName2] = useState(false);
  const [tempSalary1, setTempSalary1] = useState(person1Salary);
  const [tempSalary2, setTempSalary2] = useState(person2Salary);
  const [tempName1, setTempName1] = useState(person1Name);
  const [tempName2, setTempName2] = useState(person2Name);

  const totalCommonExpenses = commonExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const commonExpensesPerPerson = totalCommonExpenses / 2;

  const person1MonthlyExpenses = person1Expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const person2MonthlyExpenses = person2Expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const person1Total = person1Salary - (commonExpensesPerPerson + person1MonthlyExpenses);
  const person2Total = person2Salary - (commonExpensesPerPerson + person2MonthlyExpenses);

  const handleSalaryChange = (person: '1' | '2', value: string) => {
    const salary = parseFloat(value) || 0;
    if (person === '1') {
      setTempSalary1(salary);
    } else {
      setTempSalary2(salary);
    }
  };

  const handleSaveSalary = (person: '1' | '2') => {
    if (person === '1') {
      dispatch(setPerson1Salary(tempSalary1));
      setEditingPerson1(false);
    } else {
      dispatch(setPerson2Salary(tempSalary2));
      setEditingPerson2(false);
    }
  };

  const handleNameChange = (person: '1' | '2', value: string) => {
    if (person === '1') {
      setTempName1(value);
    } else {
      setTempName2(value);
    }
  };

  const handleSaveName = (person: '1' | '2') => {
    if (person === '1') {
      dispatch(setPerson1Name(tempName1));
      setEditingName1(false);
    } else {
      dispatch(setPerson2Name(tempName2));
      setEditingName2(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: { xs: 1, sm: 2, md: 3 } }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Resumen de Gastos
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Salarios */}
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountBalanceIcon color="primary" />
            <Typography variant="h6">Salarios</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {/* Persona 1 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {editingName1 ? (
                  <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      value={tempName1}
                      onChange={(e) => handleNameChange('1', e.target.value)}
                      size="small"
                    />
                    <IconButton onClick={() => handleSaveName('1')} color="primary" size="small">
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => setEditingName1(false)} color="error" size="small">
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                      {person1Name}
                    </Typography>
                    <IconButton onClick={() => setEditingName1(true)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {editingPerson1 ? (
                  <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <TextField
                      fullWidth
                      label="Salario"
                      type="number"
                      value={tempSalary1}
                      onChange={(e) => handleSalaryChange('1', e.target.value)}
                      size="small"
                    />
                    <IconButton onClick={() => handleSaveSalary('1')} color="primary" size="small">
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => setEditingPerson1(false)} color="error" size="small">
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                      ${person1Salary.toFixed(2)}
                    </Typography>
                    <IconButton onClick={() => setEditingPerson1(true)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </Box>
            </Box>

            {/* Persona 2 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {editingName2 ? (
                  <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      value={tempName2}
                      onChange={(e) => handleNameChange('2', e.target.value)}
                      size="small"
                    />
                    <IconButton onClick={() => handleSaveName('2')} color="primary" size="small">
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => setEditingName2(false)} color="error" size="small">
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                      {person2Name}
                    </Typography>
                    <IconButton onClick={() => setEditingName2(true)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {editingPerson2 ? (
                  <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <TextField
                      fullWidth
                      label="Salario"
                      type="number"
                      value={tempSalary2}
                      onChange={(e) => handleSalaryChange('2', e.target.value)}
                      size="small"
                    />
                    <IconButton onClick={() => handleSaveSalary('2')} color="primary" size="small">
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => setEditingPerson2(false)} color="error" size="small">
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                      ${person2Salary.toFixed(2)}
                    </Typography>
                    <IconButton onClick={() => setEditingPerson2(true)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Gastos Comunes */}
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountBalanceIcon color="primary" />
            <Typography variant="h6">Gastos Comunes</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">Total:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ${totalCommonExpenses.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">Por persona:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ${commonExpensesPerPerson.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Resumen Persona 1 */}
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon color="primary" />
            <Typography variant="h6">Resumen {person1Name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">Gastos mensuales:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ${person1MonthlyExpenses.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">Parte de gastos comunes:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ${commonExpensesPerPerson.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography variant="body1">Total disponible:</Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 600,
                  color: person1Total >= 0 ? 'success.main' : 'error.main',
                }}
              >
                ${person1Total.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Resumen Persona 2 */}
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon color="primary" />
            <Typography variant="h6">Resumen {person2Name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">Gastos mensuales:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ${person2MonthlyExpenses.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">Parte de gastos comunes:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ${commonExpensesPerPerson.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography variant="body1">Total disponible:</Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 600,
                  color: person2Total >= 0 ? 'success.main' : 'error.main',
                }}
              >
                ${person2Total.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard; 