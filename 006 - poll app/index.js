const pollContent = {
    qs: 'What is your favorite programming language?',
    opts: ['0. Java', '1. C++', '2. Python', '3. Javascript', '4. Go'],
    ans: [0, 0, 0, 0, 0],
    showPollContents() {
        console.log(`${pollContent.qs}`);
        pollContent.opts.forEach(curr => console.log(`${curr}`));
    },
    registerNewAnswer() {
        this.showPollContents();
        answer = parseInt(prompt("(Write option number)\n"));
        if (!isNaN(answer) && answer >= 0 && answer < 5) {
            this.ans[answer]++;
            this.displayResults(this.ans);
        }
    },
    displayResults(results) {
        if (Array.isArray(results)) {
            console.log(`--- Here are polling results ----`);

            results.forEach((curr, idx) => {
                let res = '';
                res += this.opts[idx];
                res += ': ';
                newres = res.padEnd(16, ' ').padEnd(curr + 16, '❤');
                console.log(`${newres}`,);
            });
        }

    }
};


const btn = document.createElement('button');
btn.classList.add('btn_1');
btn.innerText = 'Answer Poll'
btn.style.cssText = 'width: 130px; height: 50px; border: none; background-color: #00ff00; font-family: calibri tahoma; font-size: 1.1rem;';

document.body.style.cssText = 'width: 80%; height: 100vh; margin: 0 auto; display: flex; align-items: center; justify-content: center;';

document.body.appendChild(btn);

document.querySelector('.btn_1').addEventListener('click', pollContent.registerNewAnswer.bind(pollContent));