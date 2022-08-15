import Head from "next/head";

const HeaderHtml = () => {
  return (
    <Head>
      <meta name='keywords' content='agendamento, serviços' />
      <meta name='author' content='Erick Gabriel Castro de Lima' />
      <meta name='robots' content='index, nofollow' />
      <meta
        name='description'
        content='Site feito para facilitar a comunicação do cliente com a empresa, deixando mais fácil a agendamento de serviços.'
      />
      <title>Agendamento de Serviços</title>
    </Head>
  );
};

export default HeaderHtml;
