import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { ThreadCardPreviewCustom } from "./ThreadCard";
import { EmptyStateCustom } from "./EmptyState";
import { SiGhostery } from "react-icons/si";

const threadColors = [
  "#ff6b6b", "#6bc5ff", "#ffd36b", "#6bff8c", "#b36bff",
  "#ff6bb7", "#6bffeb", "#ffb36b", "#6b6bff", "#6bffa5"
];

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const generatePoints = (n, radius = 120, cx = 150, cy = 150) => {
  const angleStep = 360 / n;
  const points = [];
  for (let i = 0; i < n; i++) {
    points.push(polarToCartesian(cx, cy, radius, angleStep * i - 90));
  }
  return points;
};

const Deadlock = ({ thread }) => {
    let threadCount = thread.length
  if (threadCount < 2 || threadCount > 12) {
    return <EmptyStateCustom icon={SiGhostery} title={"No Deadlocks Detected - Go Grab a Coffee ☕"} desc={`It's a miracle! Threads are cooperating like it's team-building day at the JVM office.`}/>;
  }
  const [isOpen ,setIsOpen]= useState(false);
  const [threadClicked ,setThreadCliked] = useState(thread[0]);
  const points = generatePoints(threadCount);
  const connections = points.map((_, i) => [points[i], points[(i + 1) % threadCount]]);
const handleClick = (index) => {
  setThreadCliked(thread[index])
  setIsOpen(true);
  // Or do something more useful like opening a modal or logging info
};
  return (
    <>
    <Box marginTop={'15vh'} className="w-[300px] h-[300px] p-4 flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 300 300">
        {connections.map(([from, to], i) => (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#333"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        ))}

        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
          </marker>
        </defs>

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={15}
            fill={threadColors[i % threadColors.length]}
             onClick={() => handleClick(i)}
          />
        ))}

        {points.map((p, i) => (
          <text
            key={"label" + i}
            x={p.x}
            y={p.y + 5}
            fontSize="12"
            textAnchor="middle"
            fill="#fff"
            fontWeight="bold"
            onClick={() => handleClick(i)}
          >
            T{i + 1}
          </text>
        ))}
      </svg>
    </Box>
    <ThreadCardPreviewCustom thread={threadClicked} isOpen={isOpen} close={()=>{setIsOpen(false)}}/>
    </>
  );
};

export default Deadlock;
