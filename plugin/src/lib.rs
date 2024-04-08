use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn test(args: String) -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_packages(vec!["go"])?
        .with_exec(vec!["go", "test", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn build(args: String) -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_packages(vec!["go"])?
        .with_exec(vec!["go", "build", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn fmt(args: String) -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_packages(vec!["go"])?
        .with_exec(vec!["go", "fmt", &args])?
        .stdout()?;
    Ok(stdout)
}
