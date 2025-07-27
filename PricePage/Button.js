
function showPlan(type) {
  const monthly = document.getElementById("monthlyPlan");
  const annual = document.getElementById("annualPlan");

  if (type === "monthly") {
    monthly.style.display = "flex";
    annual.style.display = "none";
  } else {
    monthly.style.display = "none";
    annual.style.display = "flex";
  }
}
