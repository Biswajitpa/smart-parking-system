export const getBranchFilter = (req) => {
  if (req.user.role === "SUPER_ADMIN") return req.query.branchId ? { branchId: req.query.branchId } : {};
  return req.user.branchId ? { branchId: req.user.branchId } : {};
};
