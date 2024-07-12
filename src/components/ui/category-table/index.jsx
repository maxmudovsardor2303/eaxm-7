// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { category } from "../../../service";
// import { useState } from "react";
// import { CategoryModal } from "@modal";
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "rgba(35,137,218,1)",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const CustomizedTables = ({ data }) => {
//   const [edit, setEdit] = useState({});
//   const [open, setOpen] = useState(false);

//   const editItem = (item) => {
//     setEdit(item);
//     setOpen(true);
//   };
//   const deleteItem = async (id) => {
//     try {
//       const response = await category.delete(id);
//       if (response.status === 200 || response.status === 201) {
//         window.location.reload();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <CategoryModal
//         item={edit}
//         open={open}
//         handleClose={() => setOpen(false)}
//       />
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell align="center">T/R</StyledTableCell>
//               <StyledTableCell align="center">Category Name</StyledTableCell>
//               <StyledTableCell align="center">Action</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data?.map((item, index) => (
//               <StyledTableRow key={index}>
//                 <StyledTableCell align="center">{index + 1}</StyledTableCell>
//                 <StyledTableCell align="center">
//                   {" "}
//                   {item.category_name}{" "}
//                 </StyledTableCell>
//                 <StyledTableCell align="center">
//                   <button onClick={() => deleteItem(item.category_id)}>
//                     {" "}
//                     <DeleteIcon />
//                   </button>
//                   <button onClick={() => editItem(item)}>
//                     <EditIcon />
//                   </button>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default CustomizedTables;



import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { category } from "../../../service";
import { useState } from "react";
import { CategoryModal } from "@modal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35,137,218,1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomizedTables = ({ data }) => {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };

  const deleteItem = async (id) => {
    try {
      const response = await category.delete(id);
      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CategoryModal
        item={edit}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">Category Name</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.category_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button onClick={() => deleteItem(item.category_id)}>
                      <DeleteIcon />
                    </button>
                    <button onClick={() => editItem(item)}>
                      <EditIcon />
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default CustomizedTables;
