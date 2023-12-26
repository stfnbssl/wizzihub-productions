function drawAxes(baseX, baseY, chartWidth) {
   var leftY, rightX;
   leftY = 5;
   rightX = baseX + chartWidth;
   // Draw y axis.
   _ctx.moveTo(baseX, leftY);
   _ctx.lineTo(baseX, baseY);
   // Draw arrow for y axis.
   _ctx.moveTo(baseX, leftY);
   _ctx.lineTo(baseX + 5, leftY + 5);
   _ctx.moveTo(baseX, leftY);
   _ctx.lineTo(baseX - 5, leftY + 5);
   // Draw x axis.
   _ctx.moveTo(baseX, baseY);
   _ctx.lineTo(rightX, baseY);
   // Draw arrow for x axis.
   _ctx.moveTo(rightX, baseY);
   _ctx.lineTo(rightX - 5, baseY + 5);
   _ctx.moveTo(rightX, baseY);
   _ctx.lineTo(rightX - 5, baseY - 5);
   // Define style and stroke lines.
   _ctx.strokeStyle = "#000";
   _ctx.stroke();
}