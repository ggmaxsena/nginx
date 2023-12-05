

var cadastros = [];
var contagemFaixaEtaria = {
  bebe: 0,
  crianca: 0,
  adolescente: 0,
  adulto: 0,
  idoso: 0,
};
var etaria = [0, 0, 0, 0, 0];

// Carregar cadastros do localStorage ao iniciar a página
window.onload = function () {
  var savedCadastros = JSON.parse(localStorage.getItem("cadastros"));
  if (savedCadastros) {
    cadastros = savedCadastros;
    exibirCadastros();
  }
};

document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var nome = document.getElementById("nome").value;
    var sobrenome = document.getElementById("sobrenome").value;
    var cpf = document.getElementById("cpf").value;
    var email = document.getElementById("email").value;
    var endereco = document.getElementById("endereco").value;
    var cep = document.getElementById("cep").value;
    var faixaEtaria = document.querySelector(
      'input[name="faixaEtaria"]:checked'
    ).value;
    var sexo = document.querySelector('input[name="sexo"]:checked').value;
    var raca = document.getElementById("raca").value;

    if (cpf.length !== 14) {
      alert("Por favor, insira um CPF válido com 11 dígitos.");
      return;
    }

    if (cep.length !== 9) {
      alert("Por favor, insira um CEP válido com 8 dígitos.");
      return;
    }

    var cadastro = {
      nome: nome,
      sobrenome: sobrenome,
      cpf: cpf,
      email: email,
      endereco: endereco,
      cep: cep,
      faixaEtaria: faixaEtaria,
      sexo: sexo,
      raca: raca,
    };

    cadastros.push(cadastro);
    exibirCadastros();

    // Salvar cadastros no localStorage
    localStorage.setItem("cadastros", JSON.stringify(cadastros));

    document.getElementById("cadastroForm").reset();

    location.reload();
  });

function exibirCadastros() {
  var cadastrosList = document.getElementById("cadastrosList");
  cadastrosList.innerHTML = "";

  cadastros.forEach(function (cadastro) {

    var listItem = document.createElement("li");
    listItem.textContent =
      "Nome: " +
      cadastro.nome +
      " " +
      cadastro.sobrenome +
      " | " +
      cadastro.cpf +
      " | " +
      cadastro.email +
      " | " +
      cadastro.endereco +
      " |  " +
      cadastro.cep +
      " | " +
      cadastro.faixaEtaria +
      " | " +
      cadastro.sexo +
      " | " +
      cadastro.raca;
    cadastrosList.appendChild(listItem);

  });
  if (cadastros.length >= 10) {
    document.getElementById("cadastroForm").style.display = "none";
  }
}

function apagarCadastro() {
  cadastros = [];
  exibirCadastros();
  document.getElementById("cadastroForm").style.display = "block";

  // Remover cadastros do localStorage ao apagar
  localStorage.removeItem("cadastros");

  location.reload();
}

function obterQuantidadePorFaixaEtaria() {

  var cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  var contagemFaixaEtaria = {
    bebe: 0,
    crianca: 0,
    adolescente: 0,
    adulto: 0,
    idoso: 0,
  };

  cadastros.forEach(function (cadastro) {
    var faixaEtaria = cadastro.faixaEtaria;
    if (contagemFaixaEtaria.hasOwnProperty(faixaEtaria)) {
      contagemFaixaEtaria[faixaEtaria]++;
    }
  });
  etaria = [contagemFaixaEtaria.bebe, contagemFaixaEtaria.crianca, contagemFaixaEtaria.adolescente, contagemFaixaEtaria.adulto, contagemFaixaEtaria.idoso]
  return etaria;
}
var quantidadePorFaixaEtaria = obterQuantidadePorFaixaEtaria();
// fim 
function obterQuantidadePorSexo() {

  var cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  var contagemSexo = {
    masculino: 0,
    feminino: 0
  };

  cadastros.forEach(function (cadastro) {
    var sexo = cadastro.sexo;
    if (contagemSexo.hasOwnProperty(sexo)) {
      contagemSexo[sexo]++;
    }
  });
  sexos = [contagemSexo.masculino, contagemSexo.feminino]
  return sexos;
}
var quantidadePorSexo = obterQuantidadePorSexo();
//fim
function obterQuantidadePorraca() {

  var cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  var contagemraca = {
    branco: 0,
    amarelo: 0,
    negro: 0,
    indigena: 0
  };

  cadastros.forEach(function (cadastro) {
    var raca = cadastro.raca;
    if (contagemraca.hasOwnProperty(raca)) {
      contagemraca[raca]++;
    }
  });
  racas = [contagemraca.branco, contagemraca.amarelo, contagemraca.negro, contagemraca.indigena]
  return racas;
}
var quantidadePorraca = obterQuantidadePorraca();


var colors = [
  "#007bff",
  "#a728a7",
  "#b9a917",
  "#0eb034",
  "#552126",
  "#ff8902",
];

/* 3 donut charts */
var donutOptions = {
  cutoutPercentage: 85,
  legend: {
    position: "bottom",
    padding: 5,
    labels: { pointStyle: "circle", usePointStyle: true },
  },
};

// donut 1
var etariaData = {
  labels: ["bebe", "crianca", "adolescente", "adulto", "idoso"],
  datasets: [
    {
      backgroundColor: colors.slice(0, 5),
      borderWidth: 0,
      data: (etaria),
    },
  ],
};

var graficoEtaria = document.getElementById("graficoetaria");
if (graficoEtaria) {
  new Chart(graficoEtaria, {
    type: "pie",
    data: etariaData,
    options: donutOptions,
  });
}
// donut 2
var sexoData = {
  labels: ["masculino", "feminino"],
  datasets: [
    {
      backgroundColor: colors.slice(0, 3),
      borderWidth: 0,
      data: sexos,
    },
  ],
};
var graficoSexo = document.getElementById("graficosexo");
if (graficoSexo) {
  new Chart(graficoSexo, {
    type: "pie",
    data: sexoData,
    options: donutOptions,
  });
}

// donut 3
var racaData = {
  labels: ["Branco", "Amarelo", "Negro", "Indigena"],
  datasets: [
    {
      backgroundColor: colors.slice(0, 4),
      borderWidth: 0,
      data: racas,
    },
  ],
};
var graficoRaca = document.getElementById("graficoraca");
if (graficoRaca) {
  new Chart(graficoRaca, {
    type: "pie",
    data: racaData,
    options: donutOptions,
  });
}
