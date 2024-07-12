import * as React from "react";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { products, category } from "@service";

const validationSchema = Yup.object().shape({
  age_max: Yup.number().required("Age Max is required"),
  age_min: Yup.number().required("Age Min is required"),
  category_id: Yup.string().required("Category ID is required"),
  color: Yup.array()
    .of(Yup.string().required("Color is required"))
    .min(1, "At least one color is required"),
  cost: Yup.number().required("Cost is required"),
  count: Yup.number().required("Count is required"),
  description: Yup.string().required("Description is required"),
  discount: Yup.number().required("Discount is required"),
  for_gender: Yup.string().required("Gender is required"),
  made_in: Yup.string().required("Made in is required"),
  product_name: Yup.string().required("Product Name is required"),
  size: Yup.array()
    .of(Yup.string().required("Size is required"))
    .min(1, "At least one size is required"),
});

const Fade = ({ children, in: open }) => {
  const style = {
    opacity: open ? 1 : 0,
    transition: "opacity 0.5s",
  };

  return <div style={style}>{open ? children : null}</div>;
};

const AddProductModal = ({ open, handleClose, item }) => {
  const initialValues = {
    age_max: item?.age_max || "",
    age_min: item?.age_min || "",
    category_id: item?.category_id || "",
    color: item?.color || [""],
    cost: item?.cost || "",
    count: item?.count || "",
    description: item?.description || "",
    discount: item?.discount || "",
    for_gender: item?.for_gender || "",
    made_in: item?.made_in || "",
    product_name: item?.product_name || "",
    size: item?.size || [""],
    category_id: item?.category_id || "",
  };

  const [categories, setCategories] = React.useState([]);

  const fetchCategories = async () => {
    const response = await category.get();
    if (response.status === 200 && response?.data?.categories) {
      setCategories(response?.data?.categories);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = item
        ? await products.update(item.id, values)
        : await products.create(values);
      if (response.status === item ? 200 : 201) {
        window.location.reload();
      } else {
        console.error("Failed to save product:", response);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: "80%",
            maxWidth: 600,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ my: 2 }}>
            {item ? "Edit Product" : "Add Product"}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {({ isSubmitting, values }) => (
              <Form>
                <Box
                  sx={{
                    display: "grid",
                    gap: "10px",
                    gridTemplateColumns: "1fr 1fr",
                    textAlign: "left",
                  }}
                >
                  <Field
                    name="age_max"
                    type="number"
                    as={TextField}
                    label="Age Max"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="age_max" />}
                  />
                  <Field
                    name="count"
                    type="number"
                    as={TextField}
                    label="Count"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="count" />}
                  />
                  <Field
                    name="age_min"
                    type="number"
                    as={TextField}
                    label="Age Min"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="age_min" />}
                  />
                  <Field
                    name="discount"
                    type="number"
                    as={TextField}
                    label="Discount"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="discount" />}
                  />
                  <Field
                    name="category_id"
                    as={Select}
                    labelId="category_id_label"
                    label="Category"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="category_id" />}
                  >
                    {categories.map((item) => (
                      <MenuItem key={item.category_id} value={item.category_id}>
                        {item.category_name}
                      </MenuItem>
                    ))}
                  </Field>
                  <Field
                    name="made_in"
                    type="text"
                    as={TextField}
                    label="Made In"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="made_in" />}
                  />
                  <FieldArray
                    name="color"
                    render={(arrayHelpers) => (
                      <Box>
                        {values.color.map((color, index) => (
                          <Box
                            key={index}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Field
                              name={`color[${index}]`}
                              type="text"
                              as={TextField}
                              label={`Color ${index + 1}`}
                              fullWidth
                              variant="outlined"
                              helperText={
                                <ErrorMessage name={`color[${index}]`} />
                              }
                            />
                            <Button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              sx={{ ml: 2 }}
                            >
                              Remove
                            </Button>
                          </Box>
                        ))}
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                          sx={{ mt: 1 }}
                        >
                          Add Color
                        </Button>
                      </Box>
                    )}
                  />
                  <Field name="for_gender" as={RadioGroup} row>
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <ErrorMessage name="for_gender" component="div" />
                  </Field>
                  <Field
                    name="cost"
                    type="number"
                    as={TextField}
                    label="Cost"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="cost" />}
                  />
                  <FieldArray
                    name="size"
                    render={(arrayHelpers) => (
                      <Box>
                        {values.size.map((size, index) => (
                          <Box
                            key={index}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Field
                              name={`size[${index}]`}
                              type="text"
                              as={TextField}
                              label={`Size ${index + 1}`}
                              fullWidth
                              variant="outlined"
                              helperText={<ErrorMessage name={`size[${index}]`} />}
                            />
                            <Button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              sx={{ ml: 2 }}
                            >
                              Remove
                            </Button>
                          </Box>
                        ))}
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                          sx={{ mt: 1 }}
                        >
                          Add Size
                        </Button>
                      </Box>
                    )}
                  />
                </Box>
                <Field
                  name="product_name"
                  type="text"
                  as={TextField}
                  label="Product Name"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                  helperText={<ErrorMessage name="product_name" />}
                />
                <Field
                  name="description"
                  type="text"
                  as={TextField}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  sx={{ mt: 1 }}
                  helperText={<ErrorMessage name="description" />}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddProductModal;
