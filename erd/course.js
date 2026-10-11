/* ERD course registry. Each erd/levels/Lxx.js calls ERD_LEVEL({...}); levels are sorted by `order`. */
window.ERD_COURSE = window.ERD_COURSE || [];
window.ERD_LEVEL = function(level){ window.ERD_COURSE.push(level); window.ERD_COURSE.sort((a,b)=>a.order-b.order); };
