-->TABELAS
------------------------------------------
--CREATE TABLE Area_T (
--    are_AreaId_IN		INT PRIMARY KEY IDENTITY(1,1),
--    are_Nome_VC		VARCHAR(255) NOT NULL,
--    are_Descricao_VC	VARCHAR(1024)
--)

--CREATE TABLE Processos_T (
--    prc_ProcessoId_IN		INT PRIMARY KEY IDENTITY(1,1),
--    prc_Nome_VC				VARCHAR(255) NOT NULL,
--    prc_Descricao_VC		VARCHAR(1024),
--    prc_ProcessoPaiId_IN	INT NULL REFERENCES Processos_T(prc_ProcessoId_IN),
--    prc_Ferramenta_VC		VARCHAR(255) NULL
--)

--ALTER TABLE Processos_T
--ADD prc_AreaId_IN INT NULL REFERENCES Area_T(are_AreaId_IN)


--------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------->Areas<-----------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------

-->PROC PARA DE INSERT/UPDATE 
------------------------------------------
GO
IF (SELECT COUNT(*) FROM SYSOBJECTS WHERE xtype = 'P' AND name = 'usp_InserirOuAtualizarAreas') > 0 
BEGIN
	DROP PROCEDURE usp_InserirOuAtualizarAreas
END
GO
CREATE PROCEDURE usp_InserirOuAtualizarAreas
    @AreaId_IN			INT				= NULL, 
    @Nome_VC			VARCHAR(255),
    @Descricao_VC		VARCHAR(1024)
AS

BEGIN
	DECLARE 
		@_CALC_AreaId_IN				INT				= @AreaId_IN	, 
		@_CALC_Nome_VC					VARCHAR(255)	= @Nome_VC		,
		@_CALC_Descricao_VC				VARCHAR(1024)	= @Descricao_VC		

    
    IF EXISTS (SELECT 1 FROM Area_T WHERE are_AreaId_IN = @_CALC_AreaId_IN)
    BEGIN
        UPDATE Area_T 
        SET 
            are_Nome_VC				= @_CALC_Nome_VC, 
            are_Descricao_VC		= @_CALC_Descricao_VC
        WHERE 
			are_AreaId_IN = @AreaId_IN;
    END
    ELSE
    BEGIN    
        INSERT INTO Area_T (are_Nome_VC, are_Descricao_VC)
        VALUES (@_CALC_Nome_VC, @_CALC_Descricao_VC)
    END
RETURN @@ERROR
END
GO
GRANT EXECUTE ON usp_InserirOuAtualizarAreas TO PUBLIC


-->PROC PARA DE DELETE
------------------------------------------
GO
IF (SELECT COUNT(*) FROM SYSOBJECTS WHERE xtype = 'P' AND name = 'usp_ExcluirArea') > 0 
BEGIN
	DROP PROCEDURE usp_ExcluirArea
END
GO
CREATE PROCEDURE usp_ExcluirArea
    @AreaId_IN INT
AS
BEGIN

	DECLARE 
		@_CALC_AreaId_IN	INT	= @AreaId_IN	
    
    IF EXISTS (SELECT 1 FROM Area_T WHERE are_AreaId_IN = @_CALC_AreaId_IN)
    BEGIN
        DELETE FROM Area_T WHERE are_AreaId_IN = @_CALC_AreaId_IN;
    END
  
END
GO
GRANT EXECUTE ON usp_ExcluirArea TO PUBLIC

-->PROC SELECT POR FILTRO
-----------------------------------------
GO
IF (SELECT COUNT(*) FROM SYSOBJECTS WHERE xtype = 'P' AND name = 'usp_SelecionarAreaPorFiltro') > 0 
BEGIN
	DROP PROCEDURE usp_SelecionarAreaPorFiltro
END
GO
CREATE PROCEDURE usp_SelecionarAreaPorFiltro
(
	@AreaId_IN		INT				= NULL	,
	@Nome_VC			VARCHAR(255)	= NULL  ,
	@Descricao_VC		VARCHAR(1024)	= NULL  

)
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED


    DECLARE @_CALC_AreaId_IN		INT				=  @AreaId_IN		,
			@_CACL_Nome_VC			VARCHAR(255)	=  @Nome_VC				,
			@_CACL_Descricao_VC		VARCHAR(1024)	=  @Descricao_VC		
			
	IF ISNULL(@_CALC_AreaId_IN,0)		= 0			SET @_CALC_AreaId_IN		= NULL	
	IF ISNULL(@_CACL_Nome_VC,'')		= ''		SET @_CACL_Nome_VC			= NULL
	IF ISNULL(@_CACL_Descricao_VC,'')	= ''		SET @_CACL_Descricao_VC		= NULL
	


	SELECT
		are_AreaId_IN			AS Area,
		are_Nome_VC				AS Nome,
		are_Descricao_VC		AS Descricao
		
	FROM 
		Area_T
	WHERE
		(@_CALC_AreaId_IN				IS NULL OR are_AreaId_IN			= @_CALC_AreaId_IN)
		AND (@_CACL_Nome_VC				IS NULL OR are_Nome_VC				= @_CACL_Nome_VC)
		AND (@_CACL_Descricao_VC		IS NULL OR are_Descricao_VC			= @_CACL_Descricao_VC)
		

END	
GRANT EXECUTE ON usp_SelecionarAreaPorFiltro TO PUBLIC

-->PROC SELECT
-----------------------------------------
GO
IF (SELECT COUNT(*) FROM SYSOBJECTS WHERE xtype = 'P' AND name = 'usp_SelecionarArea') > 0 
BEGIN
	DROP PROCEDURE usp_SelecionarArea
END
GO
CREATE PROCEDURE usp_SelecionarArea
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

	SELECT
		are_AreaId_IN			AS Area,
		are_Nome_VC				AS Nome,
		are_Descricao_VC		AS Descricao
		
	FROM 
		Area_T
	
END	
GRANT EXECUTE ON usp_SelecionarArea TO PUBLIC

--------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------>Processos<---------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------

-->PROC PARA DE INSERT/UPDATE 
------------------------------------------
GO
IF (SELECT COUNT(*) FROM SYSOBJECTS WHERE xtype = 'P' AND name = 'usp_InserirOuAtualizarProcesso') > 0 
BEGIN
	DROP PROCEDURE usp_InserirOuAtualizarProcesso
END
GO
CREATE PROCEDURE usp_InserirOuAtualizarProcesso
    @ProcessoId_IN		INT				= NULL, 
    @Nome_VC			VARCHAR(255),
    @Descricao_VC		VARCHAR(1024),
    @ProcessoPaiId_IN	INT				= NULL,
    @Ferramenta_VC		VARCHAR(255)	= NULL,
	@Area_IN			INT				= NULL
AS

BEGIN
	DECLARE 
		@_CALC_ProcessoId_IN			INT				= @ProcessoId_IN	, 
		@_CALC_Nome_VC					VARCHAR(255)	= @Nome_VC			,
		@_CALC_Descricao_VC				VARCHAR(1024)	= @Descricao_VC		,
		@_CALC_ProcessoPaiId_IN			INT				= @ProcessoPaiId_IN	,
		@_CALC_Ferramenta_VC			VARCHAR(255) 	= @Ferramenta_VC	,
		@_CALC_Area_IN					INT				= @Area_IN	

    
    IF EXISTS (SELECT 1 FROM Processos_T WHERE prc_ProcessoId_IN = @_CALC_ProcessoId_IN)
    BEGIN
        UPDATE Processos_T 
        SET 
            prc_Nome_VC				= @_CALC_Nome_VC, 
            prc_Descricao_VC		= @_CALC_Descricao_VC, 
            prc_ProcessoPaiId_IN	= @_CALC_ProcessoPaiId_IN,
            prc_Ferramenta_VC		= @_CALC_Ferramenta_VC,
			prc_AreaId_IN			= @_CALC_Area_IN
        WHERE 
			prc_ProcessoId_IN = @_CALC_ProcessoId_IN;
    END
    ELSE
    BEGIN    
        INSERT INTO Processos_T (prc_Nome_VC, prc_Descricao_VC, prc_ProcessoPaiId_IN, prc_Ferramenta_VC, prc_AreaId_IN)
        VALUES (@_CALC_Nome_VC, @_CALC_Descricao_VC, @_CALC_ProcessoPaiId_IN, @_CALC_Ferramenta_VC, @_CALC_Area_IN)
    END
RETURN @@ERROR
END
GO
GRANT EXECUTE ON usp_InserirOuAtualizarProcesso TO PUBLIC


-->PROC PARA DE DELETE
------------------------------------------
GO
IF (SELECT COUNT(*) FROM SYSOBJECTS WHERE xtype = 'P' AND name = 'usp_ExcluirProcesso') > 0 
BEGIN
	DROP PROCEDURE usp_ExcluirProcesso
END
GO
CREATE PROCEDURE usp_ExcluirProcesso
    @ProcessoId_IN INT
AS
BEGIN

	DECLARE 
		@_CALC_ProcessoId_IN	INT	= @ProcessoId_IN	
    
    IF EXISTS (SELECT 1 FROM Processos_T WHERE prc_ProcessoId_IN = @_CALC_ProcessoId_IN)
    BEGIN
        DELETE FROM Processos_T WHERE prc_ProcessoId_IN = @ProcessoId_IN;
    END
  
END
GO
GRANT EXECUTE ON usp_ExcluirProcesso TO PUBLIC

-->PROC SELECT POR FILTRO
-----------------------------------------
GO
IF (SELECT COUNT(*) FROM SYSOBJECTS WHERE xtype = 'P' AND name = 'usp_SelecionarProcesosPorFiltro') > 0 
BEGIN
	DROP PROCEDURE usp_SelecionarProcesosPorFiltro
END
GO
CREATE PROCEDURE usp_SelecionarProcesosPorFiltro
(
	@ProcessoId_IN		INT				= NULL	,
	@Nome_VC			VARCHAR(255)	= NULL  ,
	@Descricao_VC		VARCHAR(1024)	= NULL  ,
	@ProcessoPaiId_IN	INT				= NULL	,
	@Ferramenta_VC		VARCHAR(255)	= NULL	,
	@Area_IN			INT				= NULL
)
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED


    DECLARE @_CACL_ProcessoId_IN		INT				=  @ProcessoId_IN		,
			@_CACL_Nome_VC				VARCHAR(255)	=  @Nome_VC				,
			@_CACL_Descricao_VC			VARCHAR(1024)	=  @Descricao_VC		,
			@_CACL_ProcessoPaiId_IN		INT				=  @ProcessoPaiId_IN	,
			@_CACL_Ferramenta_VC		VARCHAR(255)	=  @Ferramenta_VC		,
			@_CALC_Area_IN				INT				=  @Area_IN	

	IF ISNULL(@_CACL_ProcessoId_IN,0)		= 0			SET @_CACL_ProcessoId_IN		= NULL	
	IF ISNULL(@_CACL_Nome_VC,'')			= ''		SET @_CACL_Nome_VC				= NULL
	IF ISNULL(@_CACL_Descricao_VC,'')		= ''		SET @_CACL_Descricao_VC			= NULL
	IF ISNULL(@_CACL_ProcessoPaiId_IN,0)	= 0			SET @_CACL_ProcessoPaiId_IN		= NULL
	IF ISNULL(@_CACL_Ferramenta_VC,'')		= ''		SET @_CACL_Ferramenta_VC		= NULL
	IF ISNULL(@_CALC_Area_IN,0)				= 0			SET @_CALC_Area_IN				= NULL


	SELECT
		PRO.prc_ProcessoId_IN		AS Processo,
		PRO.prc_Nome_VC				AS Nome,
		PRO.prc_Descricao_VC		AS Descricao,
		PRO.prc_ProcessoPaiId_IN	AS ProcessoPai,
		PRO.prc_Ferramenta_VC		AS Ferramenta,
		ARE.are_Nome_VC				AS Area
	FROM 
		Processos_T (NOLOCK) PRO
		LEFT JOIN Area_T (NOLOCK) ARE ON ARE.are_AreaId_IN = PRO.prc_AreaId_IN
	WHERE
		(@_CACL_ProcessoId_IN			IS NULL OR prc_ProcessoId_IN		= @_CACL_ProcessoId_IN)
		AND (@_CACL_Nome_VC				IS NULL OR prc_Nome_VC				= @_CACL_Nome_VC)
		AND (@_CACL_Descricao_VC		IS NULL OR prc_Descricao_VC			= @_CACL_Descricao_VC)
		AND (@_CACL_ProcessoPaiId_IN	IS NULL OR prc_ProcessoPaiId_IN		= @_CACL_ProcessoPaiId_IN)
		AND (@_CACL_Ferramenta_VC		IS NULL OR prc_Ferramenta_VC		= @_CACL_Ferramenta_VC)
		AND (@_CALC_Area_IN				IS NULL OR prc_AreaId_IN			= @_CALC_Area_IN)

END	
GRANT EXECUTE ON usp_SelecionarProcesosPorFiltro TO PUBLIC


-->PROC SELECT
-----------------------------------------
GO
IF (SELECT COUNT(*) FROM SYSOBJECTS WHERE xtype = 'P' AND name = 'usp_SelecionarProcesos') > 0 
BEGIN
	DROP PROCEDURE usp_SelecionarProcesos
END
GO
CREATE PROCEDURE usp_SelecionarProcesos
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

	SELECT
		PRO.prc_ProcessoId_IN		AS Processo,
		PRO.prc_Nome_VC				AS Nome,
		PRO.prc_Descricao_VC		AS Descricao,
		PRO.prc_ProcessoPaiId_IN	AS ProcessoPai,
		PRO.prc_Ferramenta_VC		AS Ferramenta,
		ARE.are_AreaId_IN			As AreaId,
		ARE.are_Nome_VC				AS Area
		
		
	FROM 
		Processos_T (NOLOCK) PRO
		LEFT JOIN Area_T (NOLOCK) ARE ON ARE.are_AreaId_IN = PRO.prc_AreaId_IN
	
END	
GRANT EXECUTE ON usp_SelecionarProcesos TO PUBLIC

