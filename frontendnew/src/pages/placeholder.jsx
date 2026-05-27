import Typography from '@mui/material/Typography';

import MainCard from 'components/MainCard';

export default function Placeholder({ title = 'Page' }) {
  return (
    <MainCard title={title}>
      <Typography variant="body2" color="text.secondary">
        This page is ready for the matching business workflow.
      </Typography>
    </MainCard>
  );
}
