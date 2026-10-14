const form = document.getElementById("imc-form");
        const resultado = document.getElementById("resultado");
        const erro = document.getElementById("erro");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            erro.textContent = "";

            const nome = document.getElementById("nome").value.trim();
            const peso = Number(document.getElementById("peso").value);
            const altura = Number(document.getElementById("altura").value);

            if (!Number.isFinite(peso) || !Number.isFinite(altura)
                || peso < 1 || peso > 500 || altura < 0.5 || altura > 2.7) {
                resultado.hidden = true;
                erro.textContent = "Informe um peso entre 1 e 500 kg e uma altura entre 0,5 e 2,7 m.";
                return;
            }

            const imc = peso / (altura * altura);

            if (!Number.isFinite(imc)) {
                resultado.hidden = true;
                erro.textContent = "Não foi possível calcular o IMC com esses valores. Confira os dados e tente novamente.";
                return;
            }

            const faixa = imc < 18.5
                ? { texto: "Abaixo do peso", imagem: "desnutrido.jpg", alt: "Ilustração da faixa abaixo do peso", cor: "#a45b08" }
                : imc < 25
                    ? { texto: "Peso adequado", imagem: "normal.jpg", alt: "Ilustração da faixa de peso adequado", cor: "#16734a" }
                    : imc < 30
                        ? { texto: "Sobrepeso", imagem: "preobeso.jpg", alt: "Ilustração da faixa de sobrepeso", cor: "#a15c0b" }
                        : { texto: "Obesidade", imagem: "obeso.jpg", alt: "Ilustração da faixa de obesidade", cor: "#bd3434" };

            document.getElementById("saudacao").textContent = nome ? `Resultado de ${nome}` : "Seu resultado";
            document.getElementById("valor-imc").textContent = imc.toFixed(2).replace(".", ",");
            document.getElementById("detalhes").textContent =
                `Peso: ${peso.toLocaleString("pt-BR")} kg · Altura: ${altura.toLocaleString("pt-BR")} m`;

            const classificacao = document.getElementById("classificacao");
            classificacao.textContent = faixa.texto;
            classificacao.style.setProperty("--status-color", faixa.cor);

            const figura = document.getElementById("figura");
            figura.src = faixa.imagem;
            figura.alt = faixa.alt;
            resultado.hidden = false;
        });
