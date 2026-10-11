/* Course registry for the guided sections ("צריך עזרה ב-ERD / SQL / נרמול / אלגברה?").
   Each level file calls ERD_LEVEL / SQL_LEVEL / NORM_LEVEL / ALG_LEVEL({...}); levels are kept sorted by `order`.
   course-ui.js renders them. window.ERD_COURSE / SQL_COURSE are the level arrays (used by tools). */
window.COURSES = window.COURSES || {};
window.COURSE_LEVEL = function(courseId, level){
  const c = window.COURSES[courseId] || (window.COURSES[courseId] = { levels: [] });
  c.levels.push(level);
  c.levels.sort((a, b) => a.order - b.order);
};
window.ERD_COURSE = (window.COURSES.erd = window.COURSES.erd || { levels: [] }).levels;
window.SQL_COURSE = (window.COURSES.sql = window.COURSES.sql || { levels: [] }).levels;
window.ERD_LEVEL = L => window.COURSE_LEVEL("erd", L);
window.SQL_LEVEL = L => window.COURSE_LEVEL("sql", L);
window.NORM_COURSE = (window.COURSES.norm = window.COURSES.norm || { levels: [] }).levels;
window.ALG_COURSE = (window.COURSES.alg = window.COURSES.alg || { levels: [] }).levels;
window.NORM_LEVEL = L => window.COURSE_LEVEL("norm", L);
window.ALG_LEVEL = L => window.COURSE_LEVEL("alg", L);
