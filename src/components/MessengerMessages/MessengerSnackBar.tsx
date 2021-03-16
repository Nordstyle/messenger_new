import React from "react";
import { Slide } from "@material-ui/core";
import { SlideProps } from "@material-ui/core/Slide";

const TransitionUp = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

export default function DirectionSnackbar() {
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={transition}
      message="I love snacks"
      key={transition ? transition.name : ""}
    />
  );
}
