function generateDots(username) {
    let results = [];

    function helper(current, index) {
        if (index === username.length - 1) {
            results.push(current + username[index]);
            return;
        }
        helper(current + username[index], index + 1);
        helper(current + username[index] + ".", index + 1);
    }
    helper("", 0);
    return [...new Set(results)];
}

document.getElementById("generateBtn").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter Gmail username");
        return;
    }
    const emails = generateDots(username);
    const output = emails.map(e => e + "@gmail.com").join("\n");
    document.getElementById("emails").value = output;
    document.getElementById("counter").innerText =
        emails.length + " Generated";
});

document.getElementById("copyBtn").addEventListener("click", function () {
    const textarea = document.getElementById("emails");
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value);
    alert("Emails copied successfully");
});

document.getElementById("downloadBtn").addEventListener("click", function () {
    const text = document.getElementById("emails").value;
    if (!text) {
        alert("No emails generated");
        return;
    }
    const blob = new Blob([text], {
        type: "text/plain"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "gmail-variations.txt";
    a.click();
});