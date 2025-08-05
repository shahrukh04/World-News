import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', asChild = false, ...props }) => {
  const baseStyle = 'px-4 py-2 rounded font-semibold focus:outline-none focus:ring';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300',
    secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-300',
  };
  
  const className = `${baseStyle} ${variants[variant]} ${props.className || ''}`;
  
  if (asChild) {
    // When asChild is true, we expect children to be a single React element
    // that we can clone and pass our props to
    const child = React.Children.only(children) as React.ReactElement;
    return React.cloneElement(child, {
      ...props,
      className: `${className} ${child.props.className || ''}`,
    });
  }
  
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
