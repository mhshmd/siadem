import { compose } from 'redux';
import withLayout from './withLayout';

// export const pageWithoutLayout = compose(
//   withData,
//   withAuth,
//   withIntl,
//   withAnalytics,
//   withStyle,
// );

export default compose(
  withLayout,
);