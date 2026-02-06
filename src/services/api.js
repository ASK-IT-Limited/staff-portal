const API_URL = 'https://default53918e53d56f4a4dba205adc87bbc2.3f.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/511feefcbd25439bad1005bf6692ad9b/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UCjx5zIfPo4YQ43qVDokUqndpMKHSxrxZ7g9Rh65cRg';
const TIMESHEET_API_URL = 'https://default53918e53d56f4a4dba205adc87bbc2.3f.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/21d995c7d0df4e3490aea998d3576e97/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fnK3Sj3inlKs3_01yOU_v4VZFQwvfWQ1rZUQzlb8nJQ';
const API_SECRET = 'x9F2kL0a9s8D';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function login(email, password) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-TSG-Secret': API_SECRET,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiError('Invalid email or password. Please try again.', 401);
    }
    throw new ApiError('An error occurred. Please try again.', response.status);
  }

  const data = await response.json();
  return {
    empID: data.empID || '',
    empName: data.empName || '',
    empDept: data.empDept || '',
    empType: data.empType === 'FT' ? 'Full-time' : data.empType === 'PT' ? 'Part-time' : data.empType || '',
    email: data.email || email,
    password: password,
    phone: data.phone || '',
    weekdayStart: data.weekdayStart || '',
    weekdayEnd: data.weekdayEnd || '',
    satStart: data.satStart || '',
    satEnd: data.satEnd || '',
  };
}

export async function generateTimesheetTemplate(email, password) {
  const response = await fetch(TIMESHEET_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-TSG-Secret': API_SECRET,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiError('Invalid email or password. Please sign out and log in again.', 401);
    }
    throw new ApiError('Failed to generate timesheet template. Please try again.', response.status);
  }

  return {
    success: true,
    message: `Timesheet template will arrive in your inbox at ${email} within 2 minutes.`,
  };
}
