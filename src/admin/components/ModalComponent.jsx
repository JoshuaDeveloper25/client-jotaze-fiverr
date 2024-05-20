import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const ModalComponent = ({
  modalTitle,
  modalText,
  handleClose,
  open,
  children,
  modalMinHeight,
  modalMaxHeight,
  modalWidth,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: modalWidth,
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "1rem",
    minHeight: modalMinHeight,
    maxHeight: modalMaxHeight,
    overflow: "auto",
  };

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
            {children}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ModalComponent;
