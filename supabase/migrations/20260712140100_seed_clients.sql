-- Seed de 10 clientes de exemplo (ids estáveis para demos)

insert into public.clients (
  id, full_name, cpf, birth_date, email, phone, profession,
  zip_code, city, state, address, complement,
  interest, budget_range, how_found_us, status, visits, photo_url
) values
  (
    '10000000-0000-4000-8000-000000000001',
    'Ana Paula Mendes', '123.456.789-01', '1990-03-15',
    'ana.mendes@email.com', '(11) 98765-4321', 'Arquiteta',
    '01310-100', 'São Paulo', 'SP', 'Av. Paulista, 1000', 'Apto 42',
    'Compra', 'R$ 100–200 mil', 'Instagram', 'active', 4, ''
  ),
  (
    '10000000-0000-4000-8000-000000000002',
    'Carlos Eduardo Silva', '234.567.890-12', '1985-07-22',
    'carlos.silva@email.com', '(21) 99876-5432', 'Engenheiro',
    '22041-080', 'Rio de Janeiro', 'RJ', 'Rua Visconde de Pirajá, 500', 'Cobertura 801',
    'Financiamento', 'R$ 50–100 mil', 'Google', 'negotiating', 7, ''
  ),
  (
    '10000000-0000-4000-8000-000000000003',
    'Fernanda Costa Oliveira', '345.678.901-23', '1995-11-08',
    'fernanda.costa@email.com', '(31) 97654-3210', 'Médica',
    '30130-000', 'Belo Horizonte', 'MG', 'Av. Afonso Pena, 1500', 'Sala 3',
    'Troca', 'Acima de R$ 200 mil', 'Indicação', 'active', 2, ''
  ),
  (
    '10000000-0000-4000-8000-000000000004',
    'João Pedro Almeida', '456.789.012-34', '1988-01-30',
    'joao.almeida@email.com', '(41) 96543-2109', 'Empresário',
    '80010-000', 'Curitiba', 'PR', 'Rua XV de Novembro, 200', 'Sala 1204',
    'Venda', 'Até R$ 50 mil', 'Outdoor', 'inactive', 1, ''
  ),
  (
    '10000000-0000-4000-8000-000000000005',
    'Mariana Souza Lima', '567.890.123-45', '1992-05-12',
    'mariana.lima@email.com', '(51) 95432-1098', 'Designer',
    '90010-150', 'Porto Alegre', 'RS', 'Rua dos Andradas, 800', 'Bloco B',
    'Compra', 'R$ 100–200 mil', 'Google', 'active', 5, ''
  ),
  (
    '10000000-0000-4000-8000-000000000006',
    'Roberto Nascimento', '678.901.234-56', '1978-09-03',
    'roberto.nasc@email.com', '(85) 94321-0987', 'Advogado',
    '60160-230', 'Fortaleza', 'CE', 'Av. Beira Mar, 3200', 'Apto 1502',
    'Financiamento', 'R$ 50–100 mil', 'Indicação', 'negotiating', 3, ''
  ),
  (
    '10000000-0000-4000-8000-000000000007',
    'Juliana Ferreira Santos', '789.012.345-67', '1993-06-18',
    'juliana.ferreira@email.com', '(62) 99123-4567', 'Contadora',
    '74003-010', 'Goiânia', 'GO', 'Av. Goiás, 450', 'Apto 78',
    'Compra', 'R$ 50–100 mil', 'Instagram', 'active', 6, ''
  ),
  (
    '10000000-0000-4000-8000-000000000008',
    'Lucas Henrique Barbosa', '890.123.456-78', '1987-12-05',
    'lucas.barbosa@email.com', '(71) 98234-5678', 'Analista de Sistemas',
    '40020-000', 'Salvador', 'BA', 'Av. Sete de Setembro, 1200', 'Ed. Atlântico, sala 5',
    'Troca', 'R$ 100–200 mil', 'Google', 'negotiating', 8, ''
  ),
  (
    '10000000-0000-4000-8000-000000000009',
    'Patricia Gomes Ribeiro', '901.234.567-89', '1991-04-27',
    'patricia.ribeiro@email.com', '(27) 97345-6789', 'Professora',
    '29010-080', 'Vitória', 'ES', 'Av. Jerônimo Monteiro, 350', 'Casa 2',
    'Financiamento', 'Até R$ 50 mil', 'Outro', 'inactive', 2, ''
  ),
  (
    '10000000-0000-4000-8000-000000000010',
    'Thiago Moreira Campos', '012.345.678-90', '1984-08-14',
    'thiago.campos@email.com', '(48) 96456-7890', 'Gerente Comercial',
    '88010-400', 'Florianópolis', 'SC', 'Rua Felipe Schmidt, 680', 'Apto 301',
    'Venda', 'Acima de R$ 200 mil', 'Indicação', 'active', 9, ''
  )
on conflict (id) do update set
  full_name = excluded.full_name,
  cpf = excluded.cpf,
  birth_date = excluded.birth_date,
  email = excluded.email,
  phone = excluded.phone,
  profession = excluded.profession,
  zip_code = excluded.zip_code,
  city = excluded.city,
  state = excluded.state,
  address = excluded.address,
  complement = excluded.complement,
  interest = excluded.interest,
  budget_range = excluded.budget_range,
  how_found_us = excluded.how_found_us,
  status = excluded.status,
  visits = excluded.visits,
  photo_url = excluded.photo_url,
  updated_at = now();
