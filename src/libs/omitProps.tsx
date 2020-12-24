import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';

/**
 * @see https://github.com/styled-system/styled-system/issues/593#issuecomment-512350138
 */
export default function omitProps(
  Component: React.ComponentType,
  propsToOmit: string[]
): React.ComponentType {
  function WithoutOmittedProps({ children, ...rest }: any) {
    return <Component {...omit(rest, propsToOmit)}>{children}</Component>;
  }

  WithoutOmittedProps.propTypes = {
    children: PropTypes.node,
  };

  WithoutOmittedProps.displayName = `WithoutOmittedProps(${
    Component.displayName || Component.name
  })`;

  return WithoutOmittedProps;
}
