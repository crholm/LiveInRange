name := "LiveInRange"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache,
  "mysql" % "mysql-connector-java" % "5.1.18",
  "org.glassfish.jersey.core" % "jersey-client" % "2.4"
)     

play.Project.playJavaSettings
