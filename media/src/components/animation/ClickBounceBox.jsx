import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function ClickBounceBox(props) {
  const [clicked, setClicked] = useState(false);
 const [hovered, setHovered] = useState(false);
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500); // reset after animation
  };
   const animate = clicked
    ? { scale: [1, 1.2, 0.9, 1.05, 1] }
    : hovered
    ? { scale: 1.15 }
    : { scale: 1 };

  return (
    <MotionBox
      cursor="pointer"
      onClick={handleClick}
       onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={animate}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {props.children}
    </MotionBox>
  );
}

export default ClickBounceBox;
