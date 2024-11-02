type PageTitleProps = {
  title?: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  if (!title) {
    return null;
  }

  return <h1 className="mb-12 text-5xl font-semibold leading-none">{title}</h1>;
};

export default PageTitle;
