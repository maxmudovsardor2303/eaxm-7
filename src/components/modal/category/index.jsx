import * as React from "react";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { category } from "../../../service";

const Fade = ({ children, in: open }) => {
  const style = {
    opacity: open ? 1 : 0,
    transition: "opacity 0.5s",
  };
  return <div style={style}>{open ? children : null}</div>;
};

const Index = ({ open, handleClose, item }) => {
  const initialValues = {
    category_name: item?.category_name || "",
    category_id: item?.category_id || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (item) {
        const payload = { id: item.id, ...values };
        const response = await category.update(payload);
        if (response.status === 200) {
          window.location.reload();
        }
      } else {
        const response = await category.create(values);
        if (response.status === 201) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal className="border border-light"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
            {item ? "Edit Category" : "Create Category"}
          </Typography>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="category_name"
                  as={TextField}
                  label="Category Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="category_name"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                    sx={{ width: '48%' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{ width: '48%' }}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Index;



