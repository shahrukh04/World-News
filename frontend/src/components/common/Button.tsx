import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', asChild = false, ...props }) => {
  const baseStyle = 'rounded font-semibold focus:outline-none focus:ring';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300',
    secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-300',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300',
  };
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const className = `${baseStyle} ${variants[variant]} ${sizes[size]} ${props.className || ''}`;
  
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
