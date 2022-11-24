import Http from "./http";
import ENV from "../env";
const login = (email, password) => {
  return Http.post(`${ENV.API_URL}/admin/login`, { email, password });
};

const uploadImage = (file) => {
  const formData = new FormData();

  formData.append("file", file);

  return Http.postFormData(`${ENV.API_URL}/services/file-upload`, formData);
};

// Sliders
const getSliders = (limit, skip,lang) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  if (lang) {
    data.lang = lang;
  }
  return Http.get(`${ENV.API_URL}/slider`, { ...data });
};
const addSlider = (data) => {
  return Http.post(`${ENV.API_URL}/slider`, data);
};

const updateSlider = (sliderId, data) => {
  return Http.put(`${ENV.API_URL}/slider/${sliderId}`, {
    slider: data,
  });
};

const getSlider = (sliderId) => {
  return Http.get(`${ENV.API_URL}/slider/${sliderId}`);
};

const deleteSlider = (sliderId) => {
  return Http.delete(`${ENV.API_URL}/slider/${sliderId}`);
};

// Events
const getEvents = (limit, skip, customQuery = {}) => {
  let data = { customQuery: JSON.stringify(customQuery) };
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/event`, { ...data });
};
const getEventsWithDetailedFilters = (
  isActive,
  tag,
  startDate,
  endDate,  
  show,
  limit,
  skip,
  _id,
  venue,
  category,
  boxOffice,
  organizer,

) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  if (_id) {
    data._id = _id;
  }
  if (venue) {
    data.venue = venue;
  }
  if (category) {
    data.category = category;
  }
  if (tag) {
    data.tag = tag;
  }
  if (boxOffice) {
    data.boxOffice = boxOffice;
  }
  if (startDate) {
    data.startDate = startDate;
  }
  if (endDate) {
    data.endDate = endDate;
  }
  if (organizer) {
    data.organizer = organizer;
  }
  if (isActive) {
    data.isActive = isActive;
  }
  if (show) {
    data.show = show;
  }
  console.log(data, "datatata");
  return Http.get(`${ENV.API_URL}/event/detailed`, { ...data });
};
const addEvent = (data) => {
  return Http.post(`${ENV.API_URL}/event`, data);
};

const updateEvent = (eventId, data) => {
  return Http.put(`${ENV.API_URL}/event/${eventId}`, {
    event: data,
  });
};

const getEvent = (eventId) => {
  return Http.get(`${ENV.API_URL}/event/${eventId}`);
};

const deleteEvent = (eventId) => {
  return Http.delete(`${ENV.API_URL}/event/${eventId}`);
};

// Shows
const getShows = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/show`, { ...data });
};
const addShow = (data) => {
  return Http.post(`${ENV.API_URL}/show`, data);
};

const updateShow = (showId, data) => {
  return Http.put(`${ENV.API_URL}/show/${showId}`, {
    show: data,
  });
};

const getShow = (showId) => {
  return Http.get(`${ENV.API_URL}/show/${showId}`);
};

const deleteShow = (showId) => {
  return Http.delete(`${ENV.API_URL}/show/${showId}`);
};

// Tickets
const getTickets = (limit, skip, customQuery = {}) => {
  let data = { customQuery: JSON.stringify(customQuery) };

  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/ticket`, { ...data });
};

const getTicketsByEventAndBlock = (eventId, blockId) => {
  return Http.get(`${ENV.API_URL}/ticket/byEventAndBlock`, {
    eventId,
    blockId,
  });
};

const updateTicket = (ticketId, data) => {
  return Http.put(`${ENV.API_URL}/ticket/${ticketId}`, {
    ticket: data,
  });
};

const getTicket = (ticketId) => {
  return Http.get(`${ENV.API_URL}/ticket/${ticketId}`);
};

const deleteTicket = (ticketId) => {
  return Http.delete(`${ENV.API_URL}/ticket/${ticketId}`);
};

// Users
const getUsers = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/user`, { ...data });
};

// SeatPlans
const getSeatPlans = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/seatPlan`, { ...data });
};
const addSeatPlan = (data) => {
  return Http.post(`${ENV.API_URL}/seatPlan`, data);
};

const updateSeatPlan = (seatPlanId, data) => {
  return Http.put(`${ENV.API_URL}/seatPlan/${seatPlanId}`, {
    seatPlan: data,
  });
};

const getSeatPlan = (seatPlanId) => {
  return Http.get(`${ENV.API_URL}/seatPlan/${seatPlanId}`);
};

const deleteSeatPlan = (seatPlanId) => {
  return Http.delete(`${ENV.API_URL}/seatPlan/${seatPlanId}`);
};

// Venues
const getVenues = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/venue`, { ...data });
};
const addVenue = (data) => {
  return Http.post(`${ENV.API_URL}/venue`, data);
};

const updateVenue = (venueId, data) => {
  return Http.put(`${ENV.API_URL}/venue/${venueId}`, {
    venue: data,
  });
};

const getVenue = (venueId) => {
  return Http.get(`${ENV.API_URL}/venue/${venueId}`);
};

const deleteVenue = (venueId) => {
  return Http.delete(`${ENV.API_URL}/venue/${venueId}`);
};

// Tags
const getTags = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/tag`, { ...data });
};
const addTag = (data) => {
  return Http.post(`${ENV.API_URL}/tag`, data);
};

const updateTag = (tagId, data) => {
  return Http.put(`${ENV.API_URL}/tag/${tagId}`, {
    tag: data,
  });
};

const getTag = (tagId) => {
  return Http.get(`${ENV.API_URL}/tag/${tagId}`);
};

const deleteTag = (tagId) => {
  return Http.delete(`${ENV.API_URL}/tag/${tagId}`);
};

// BoxOffices
const getBoxOffices = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/boxOffice`, { ...data });
};
const addBoxOffice = (data) => {
  return Http.post(`${ENV.API_URL}/boxOffice`, data);
};

const updateBoxOffice = (boxOfficeId, data) => {
  return Http.put(`${ENV.API_URL}/boxOffice/${boxOfficeId}`, {
    boxOffice: data,
  });
};

const getBoxOffice = (boxOfficeId) => {
  return Http.get(`${ENV.API_URL}/boxOffice/${boxOfficeId}`);
};

const deleteBoxOffice = (boxOfficeId) => {
  return Http.delete(`${ENV.API_URL}/boxOffice/${boxOfficeId}`);
};

// Levels
const getLevels = (limit, skip, eventId) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  if (eventId) {
    data.eventId = eventId;
  }
  return Http.get(`${ENV.API_URL}/level`, { ...data });
};

const levelsByEventId = (eventId) => {
  return Http.get(`${ENV.API_URL}/level/byEventId`, { eventId });
};
const addLevel = (data) => {
  return Http.post(`${ENV.API_URL}/level`, data);
};

const updateLevel = (levelId, data) => {
  return Http.put(`${ENV.API_URL}/level/${levelId}`, {
    level: data,
  });
};

const getLevel = (levelId) => {
  return Http.get(`${ENV.API_URL}/level/${levelId}`);
};

const deleteLevel = (levelId) => {
  return Http.delete(`${ENV.API_URL}/level/${levelId}`);
};

// Categories
const getCategories = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/category`, { ...data });
};
const addCategory = (data) => {
  return Http.post(`${ENV.API_URL}/category`, data);
};

const updateCategory = (categoryId, data) => {
  return Http.put(`${ENV.API_URL}/category/${categoryId}`, {
    category: data,
  });
};

const getCategory = (categoryId) => {
  return Http.get(`${ENV.API_URL}/category/${categoryId}`);
};

const deleteCategory = (categoryId) => {
  return Http.delete(`${ENV.API_URL}/category/${categoryId}`);
};

// Admins
const getPermissions = () => {
  return Http.get(`${ENV.API_URL}/admin/permissions`);
};

const getAdmins = (limit, skip, customQuery = {}) => {
  let data = { customQuery: JSON.stringify(customQuery) };
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/admin`, { ...data });
};

const getOrganizers = () => {
  return Http.get(`${ENV.API_URL}/admin/organizers`);
};
const getAdmin = (adminId) => {
  return Http.get(`${ENV.API_URL}/admin/${adminId}`);
};

const updateAdminStatusById = (adminId, isActive) => {
  return Http.patch(`${ENV.API_URL}/admin/${adminId}/status/${isActive}`);
};

const deleteAdmin = (adminId) => {
  return Http.delete(`${ENV.API_URL}/admin/${adminId}`);
};

const addAdmin = (data) => {
  return Http.post(`${ENV.API_URL}/admin`, data);
};
const updateAdmin = (adminId, data) => {
  return Http.put(`${ENV.API_URL}/admin/${adminId}`, {
    admin: data,
  });
};

const setAdminPermissionGroup = (adminId, permissionGroup) => {
  return Http.patch(`${ENV.API_URL}/admin/${adminId}/permissionGroup`, {
    permissionGroup,
  });
};

const renewPassword = (adminId, newPassword) => {
  return Http.patch(`${ENV.API_URL}/admin/${adminId}/renewPassword`, {
    newPassword,
  });
};

const verifyToken = () => {
  return Http.post(`${ENV.API_URL}/admin/verifyToken`);
};

// PermissionGroups
const getPermissionGroups = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/admin/permissionGroup`, { ...data });
};
const addPermissionGroup = (data) => {
  return Http.post(`${ENV.API_URL}/admin/permissionGroup`, data);
};

const updatePermissionGroup = (permissionGroupId, data) => {
  return Http.patch(
    `${ENV.API_URL}/admin/permissionGroup/${permissionGroupId}`,
    {
      permissionGroup: data,
    }
  );
};

const getPermissionGroup = (permissionGroupId) => {
  return Http.get(`${ENV.API_URL}/admin/permissionGroup/${permissionGroupId}`);
};

const deletePermissionGroup = (permissionGroupId) => {
  return Http.delete(
    `${ENV.API_URL}/admin/permissionGroup/${permissionGroupId}`
  );
};

// Blocks
const getBlocks = (limit, skip, customQuery = {}) => {
  let data = { customQuery: JSON.stringify(customQuery) };
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/block`, { ...data });
};
const addBlock = (data) => {
  return Http.post(`${ENV.API_URL}/block`, data);
};

const updateBlock = (blockId, data) => {
  return Http.patch(`${ENV.API_URL}/block/${blockId}`, {
    block: data,
  });
};

const getBlock = (blockId) => {
  return Http.get(`${ENV.API_URL}/block/${blockId}`);
};

const deleteBlock = (blockId) => {
  return Http.delete(`${ENV.API_URL}/block/${blockId}`);
};

// Seats
const getSeats = (limit, skip) => {
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/seat`, { ...data });
};
const addSeat = (data) => {
  return Http.post(`${ENV.API_URL}/seat`, data);
};

const updateSeat = (seatId, data) => {
  return Http.patch(`${ENV.API_URL}/seat/${seatId}`, {
    seat: data,
  });
};

const updateSeats = (seats) => {
  return Http.patch(`${ENV.API_URL}/seat/bulk`, {
    seats,
  });
};

const getSeat = (seatId) => {
  return Http.get(`${ENV.API_URL}/seat/${seatId}`);
};

const deleteSeat = (seatId) => {
  return Http.delete(`${ENV.API_URL}/seat/${seatId}`);
};
const getSeatsByEventAndBlock = (eventId, blockId) => {
  return Http.get(`${ENV.API_URL}/seat/byEventAndBlock`, { eventId, blockId });
};

export default {
  login,
  uploadImage,

  //admin
  verifyToken,
  getPermissions,
  renewPassword,
  setAdminPermissionGroup,
  addAdmin,
  updateAdmin,
  updateAdminStatusById,
  getAdmins,
  getOrganizers,
  getAdmin,
  deleteAdmin,

  //permissionGroup
  getPermissionGroups,
  getPermissionGroup,
  addPermissionGroup,
  updatePermissionGroup,
  deletePermissionGroup,

  //slider
  getSliders,
  getSlider,
  addSlider,
  updateSlider,
  deleteSlider,

  //Event
  getEvents,
  getEvent,
  getEventsWithDetailedFilters,
  addEvent,
  updateEvent,
  deleteEvent,

  //Show
  getShows,
  getShow,
  addShow,
  updateShow,
  deleteShow,

  //Ticket
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  getTicketsByEventAndBlock,

  //User
  getUsers,

  //SeatPlan
  getSeatPlans,
  getSeatPlan,
  addSeatPlan,
  updateSeatPlan,
  deleteSeatPlan,

  //Venue
  getVenues,
  getVenue,
  addVenue,
  updateVenue,
  deleteVenue,

  //Tag
  getTags,
  getTag,
  addTag,
  updateTag,
  deleteTag,

  //BoxOffice
  getBoxOffices,
  getBoxOffice,
  addBoxOffice,
  updateBoxOffice,
  deleteBoxOffice,

  //Level
  getLevels,
  getLevel,
  addLevel,
  updateLevel,
  deleteLevel,
  levelsByEventId,

  //Block
  getBlocks,
  getBlock,
  addBlock,
  updateBlock,
  deleteBlock,

  //Seat
  getSeats,
  getSeat,
  addSeat,
  updateSeat,
  updateSeats,
  deleteSeat,
  getSeatsByEventAndBlock,

  //Category
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
