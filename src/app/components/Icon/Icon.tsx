import React, { FunctionComponent } from 'react';
import { Center } from '@mantine/core';
import { media } from 'styles/media';

interface IconProps {
  small?: number;
  large?: number;
  color?: string;
  icon: FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
const Icon = ({ icon: IconComponent, small, large, color }: IconProps) => {
  return (
    <Center
      sx={{
        width: large,
        height: large,
        color: color ? color : 'var(--black)',
        [media.small()]: {
          width: small ? small : large,
          height: small ? small : large,
        },
      }}
    >
      <IconComponent width="100%" height="100%" />
    </Center>
  );
};

export default Icon;
