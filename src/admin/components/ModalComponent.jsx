import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "1rem",
  minHeight: "10rem",
  maxHeight: "20rem",
  overflow: "auto",
};

const ModalComponent = ({ modalTitle, modalText, handleClose, open }) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CloseIcon
            onClick={handleClose}
            sx={{ position: "absolute", right: "1rem", cursor: "pointer" }}
          />

          <Typography sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>
            {modalTitle}
          </Typography>

          <Typography
            color={"#888"}
            sx={{ marginTop: ".5rem" }}
            variant="body2"
            component="h2"
          >
            {modalText}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ModalComponent;
