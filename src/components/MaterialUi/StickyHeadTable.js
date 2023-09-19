import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getAllUsersFromBackend } from '../../service/LoginService';
import { faker } from '@faker-js/faker';
import RadarChartComponent from './RadarChartComponent';
const columns = [
  { id: 'userId', label: 'Id', minWidth: 170},
  { id: 'username', label: 'UserName', minWidth: 100 },
  {
    id: 'totalVideos',
    label: 'TotalVideos',
    minWidth: 100,
     align: 'center',
  },
  {
    id: 'totalArticles',
    label: 'TotalArticles',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'totalContent',
    label: 'TotalContent',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'totalCategories',
    label: 'TotalCategories',
    minWidth: 100,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
];


export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users,setUsers]=React.useState([]);
  
  React.useEffect(() => {
 
    getAllUsersFromBackend().then(response => {
      setUsers(response.data);
    
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);
  console.log(users);

  function createData(userId, username, totalVideos, totalArticles,totalContent,totalCategories) {
    return {userId, username, totalVideos, totalArticles,totalContent,totalCategories };
  }
  
  const rows = users.map((user,index) =>
  createData(
    index + 1, // You can use userId or any other unique identifier as the "code"
    user.username,
    user.totalVideos,
    user.totalArticles,
    user.totalContent,
    user.totalCategories,
  )
);

console.log(rows);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
     <div style={{display:"flex"}}>
    <Paper sx={{marginLeft:'20px', width: '70%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 320}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: 5, padding: '10px',fontWeight:'bold',fontSize:'15px'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
{rows
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  .map((row) => {
    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
        {columns.map((column,index) => {
          if (column.id === 'username') {
            return (
              <TableCell key={column.id} align={column.align}
              style={{padding: '10px'}}
              >
                <div style={{display: "flex"}}>
                  <img
                    src={faker.image.avatar()}
                    alt={`Profile of ${row.username}`}
                    style={{ width: '24px', height: '24px', marginRight: '8px', border:'1px solid green',borderRadius:"50%"}}
                  />
                  {column.format && typeof row[column.id] === 'number'
                    ? column.format(row[column.id])
                    : row[column.id]}
                </div>
              </TableCell>
            );
          } else {
            const value = row[column.id];
            return (
              <TableCell key={column.id} align={column.align}
              style={{padding: '10px'}}
              >
                {column.format && typeof value === 'number'
                  ? column.format(value)
                  : value}
              </TableCell>
            );
          }
        })}
      </TableRow>
    );
  })}

          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
         rowsPerPageOptions={[5, 10, 25, 100]}
         component="div"
         count={rows.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
 <div style={{width:"350px", backgroundColor:"#ffffffe6",
    marginLeft: "20px",
    borderRadius: "10px"}}>
 <RadarChartComponent data={users} />
 </div>
    </div>
  </>
  );
}