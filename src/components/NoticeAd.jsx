import React, { useState } from 'react';
import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const NoticeAd = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const openJoinPage = () => {
    setOpen(false);
    navigate('/volunteer');
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-label="DEP-BUS announcement"
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          position: 'relative',
          overflow: 'hidden',
          width: { xs: 'calc(100% - 32px)', sm: 'min(460px, calc(100% - 64px))' },
          maxHeight: '90vh',
          borderRadius: { xs: 2, sm: 3 },
          bgcolor: 'background.paper',
        },
      }}
    >
      <IconButton
        aria-label="Close announcement"
        onClick={() => setOpen(false)}
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          bgcolor: 'rgba(255,255,255,0.92)',
          '&:hover': { bgcolor: 'common.white' },
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ p: { xs: 1, sm: 1.5 }, pb: 0, textAlign: 'center' }}>
        <ButtonBase
          onClick={openJoinPage}
          aria-label="Open the membership join page"
          sx={{
            display: 'block',
            width: 'fit-content',
            maxWidth: '100%',
            mx: 'auto',
            borderRadius: 1.5,
            overflow: 'hidden',
            '&:focus-visible': {
              outline: '3px solid',
              outlineColor: 'success.main',
              outlineOffset: 2,
            },
          }}
        >
          <img
            src="/images/ad.png"
            alt="DEP-BUS membership announcement"
            style={{
              display: 'block',
              width: 'auto',
              maxWidth: '100%',
              maxHeight: '72vh',
              objectFit: 'contain',
            }}
          />
        </ButtonBase>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: { xs: 1.5, sm: 2 } }}>
        <Button variant="contained" color="success" onClick={openJoinPage}>
          Join now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoticeAd;
